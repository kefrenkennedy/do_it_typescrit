import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { api } from "../services/api";
import { useMemo } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  id: string;
  name: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  accessToken: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: UpdateData) => Promise<void>;
}

interface UpdateData {
  userId: string;
  updatedName: string;
  updatedEmail: string;
  updatedPassword: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@Doit:accessToken");

    const user = localStorage.getItem("@Doit:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/login", { email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem("@Doit:accessToken", accessToken);
    localStorage.setItem("@Doit:user", JSON.stringify(user));

    setData({ accessToken, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Doit:accessToken");
    localStorage.removeItem("@Doit:user");
    setData({} as AuthState);
  }, []);

  const updateProfile = useCallback(
    async ({ updatedName, updatedEmail, updatedPassword }: UpdateData) => {
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

      if (updatedPassword && updatedPassword != "") {
        updatedFields.password = updatedPassword;
      }

      await api
        .patch(
          `/dashboard/user/${data.user.id}`,
          { ...updatedFields, userId: data.user.id },
          {
            headers: { Authorization: `Bearer ${data.accessToken}` },
          }
        )
        .then((res) => {
          console.log("res Antes do setData:", res);
          setData((prevValue) => ({
            ...prevValue,
            user: res.data.data.updatedUser,
          }));
          console.log("dois data:", res.data.data);
          localStorage.setItem("@Doit:user", JSON.stringify(res.data.data.updatedUser));
        })
        .catch((err) => console.log(err));
    },
    [data, setData]
  );

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
