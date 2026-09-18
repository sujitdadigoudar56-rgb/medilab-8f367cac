import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { apiGet, apiPost, getToken, setToken, clearToken } from "@/lib/api";

export type AppRole = "admin" | "doctor" | "nurse" | "patient";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: AppRole;
}

interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: AppRole;
}

interface AuthContextType {
  user: AuthUser | null;
  role: AppRole | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    apiGet<AuthUser>("/auth/me")
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user: loggedInUser } = await apiPost<AuthResponse>("/auth/login", { email, password });
    setToken(token);
    setUser(loggedInUser);
  };

  const register = async (data: RegisterData) => {
    const { token, user: newUser } = await apiPost<AuthResponse>("/auth/register", data);
    setToken(token);
    setUser(newUser);
  };

  const signOut = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role ?? null, loading, login, register, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
