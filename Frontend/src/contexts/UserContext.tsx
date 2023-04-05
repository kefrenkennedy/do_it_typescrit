import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { api } from "../services/api";
import { useAuth } from "./AuthContext";

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

interface UserContextData {
  user: User;
  accessToken: string;
  updateUser: (updatedData: UpdateData) => Promise<void>;
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

  const updateUser = useCallback(
    async ({
      userId,
      updatedName,
      updatedEmail,
      updatedPassword,
    }: UpdateData) => {
      const { accessToken, user } = useAuth();

      const updatedFields: {
        name?: string;
        email?: string;
        password?: string;
      } = {};

      if (updatedName) {
        updatedFields.name = updatedName;
      }

      if (updatedEmail) {
        updatedFields.email = updatedEmail;
      }

      if (updatedPassword) {
        updatedFields.password = updatedPassword;
      }
      await api
        .patch(
          `/dashboard/${userId}`,
          { ...updatedFields, userId },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((res) => {
          const updatedUsers = users.map((user) => {
            if (user.id === userId) {
              return {
                ...user,
                name: updatedFields.name ?? user.name,
                email: updatedFields.email ?? user.email,
                password: updatedFields.password ?? user.password,
              };
            }
            return user;
          });
          setUsers(updatedUsers);
        })
        .catch((err) => console.log(err));
    },
    [users]
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
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useUser };
