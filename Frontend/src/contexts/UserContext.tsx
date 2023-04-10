import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { api } from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
  password: string;
  id: string;
}

interface UserState {
  accessToken: string;
  user: User;
}

interface UpdateData {
  userId: string;
  updatedName: string;
  updatedEmail: string;
  updatedPassword: string;
}

export interface DeleteAccountData {
  userId: string;
  accessToken: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  setLoading: (bool: boolean) => void;
  onModalSuccessOpen: () => void;
  onModalErrorOpen: () => void;
  setErrorToast: (err: string) => void;
}

interface UserContextData {
  user: User;
  accessToken: string;
  createUser: (data: CreateUserData) => Promise<void>;
  deleteUser: (data: DeleteAccountData) => Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [data, setData] = useState<UserState>(() => {
    const accessToken = localStorage.getItem("@Doit:accessToken");

    const user = localStorage.getItem("@Doit:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }
    return {} as UserState;
  });

  const createUser = useCallback(
    async ({
      name,
      email,
      password,
      setLoading,
      onModalSuccessOpen,
      onModalErrorOpen,
      setErrorToast,
    }: CreateUserData) => {
      setLoading(true);
      await api
        .post("/dashboard/user", { name, email, password })
        .then((res) => {
          setLoading(false);
          onModalSuccessOpen();
        })
        .catch((err) => {
          setErrorToast(
            String(
              err.response.data.message
                ? err.response.data.message
                : err.response.data.errors
            )
          );
          setLoading(false);
          onModalErrorOpen();
        });
    },
    []
  );


  const deleteUser = useCallback(
    async ({ userId, accessToken }: DeleteAccountData) => {
      await api
        .delete(`/dashboard/user/${userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((_) => {
          const filteredusers = users.filter((user) => user.id != userId);
          localStorage.removeItem("@Doit:accessToken");
          localStorage.removeItem("@Doit:user");
          setUsers(filteredusers);
        })
        .catch((err) => console.log(err));
    },
    [users]
  );

  return (
    <UserContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        createUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
