"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface UserData {
  token: string;
  [key: string]: unknown; // Para permitir propiedades adicionales
}

interface AuthContextProps {
  isLogged: boolean;
  token: string | null;
  data: UserData | null;
  login: (dataUsuario: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<UserData | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("authToken");
          if (token) {
            setToken(token);
            setIsLogged(true);
          }
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
      }
    };

    checkToken();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken") {
        if (e.newValue) {
          setToken(e.newValue);
          setIsLogged(true);
        } else {
          setToken(null);
          setIsLogged(false);
          setData(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (dataUsuario: UserData) => {
    try {
      console.log("Datos recibidos en login:", dataUsuario);
      localStorage.setItem("authToken", dataUsuario.token);
      setData(dataUsuario);
      // console.log("Informacion de usuario guardada: ", data);
      setToken(dataUsuario.token);
      setIsLogged(true);
      // console.log("Token guardado:", dataUsuario.token);
    } catch (error) {
      console.error("Error al guardar token:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("authToken");
      setData(null);
      setToken(null);
      setIsLogged(false);
    } catch (error) {
      console.error("Error al eliminar token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogged, token, data, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
