"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DataUser } from "@/types/dataUser";

interface AuthContextProps {
  token: string | null;
  dataUser: DataUser | null;
  isLogged: boolean;
  isLoading: boolean;
  login: (token: string, dataUsuario: DataUser, rememberMe: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [dataUser, setDataUser] = useState<DataUser | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      try {
        if (typeof window !== "undefined") {
          const storedToken =
            localStorage.getItem("authToken") ||
            sessionStorage.getItem("authToken");
          const storedDataUser =
            localStorage.getItem("authData") ||
            sessionStorage.getItem("authData");

          if (storedToken && storedDataUser) {
            setToken(storedToken);
            setDataUser(JSON.parse(storedDataUser));
            setIsLogged(true);
          }
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();

    /* const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "authToken") {
        if (e.newValue) {
          setToken(e.newValue);
          setIsLogged(true);
        } else {
          setToken(null);
          setIsLogged(false);
          setDataUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange); */
  }, []);

  const login = (token: string, dataUser: DataUser, rememberMe: boolean) => {
    try {
      setDataUser(dataUser);
      setToken(token);

      const dataString = JSON.stringify({
        cveUSuario: dataUser.cveUsuario,
        cveIdioma: dataUser.cveIdioma,
        cvePerfil: dataUser.cvePerfil,
        nombre: dataUser.nombre,
        idQuiniela: dataUser.idQuiniela,
        idParticipante: dataUser.idParticipante,
        idPeriodo: dataUser.idPeriodo,
        bResSurv: dataUser.bResSurv,
        fLimite: dataUser.fLimite,
        horaLimite: dataUser.horaLimite,
        titQuiniela: dataUser.titQuiniela,
        bSurvivor: dataUser.bSurvivor,
      });

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("authData", dataString);
      storage.setItem("authToken", token);

      setIsLogged(true);
    } catch (error) {
      console.error("Error al guardar token:", error);
    }
  };

  const logout = () => {
    try {
      setDataUser(null);
      setToken(null);

      localStorage.removeItem("authToken");
      localStorage.removeItem("authData");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("authData");

      setIsLogged(false);
    } catch (error) {
      console.error("Error al eliminar token:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, dataUser, isLogged, isLoading, login, logout }}
    >
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
