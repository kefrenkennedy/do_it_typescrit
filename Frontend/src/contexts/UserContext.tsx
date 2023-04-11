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

  return (
    <UserContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
