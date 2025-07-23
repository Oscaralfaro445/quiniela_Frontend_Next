"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface DataUser {
  cveIdioma: string;
  cvePerfil: string;
  nombre: string;
  idQuiniela: number;
  idParticipante: number;
  idPeriodo: string;
}

interface AuthContextProps {
  isLogged: boolean;
  token: string | null;
  dataUser: DataUser | null;
  login: (token: string, dataUsuario: DataUser, rememberMe: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [dataUser, setDataUser] = useState<DataUser | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      try {
        if (typeof window !== "undefined") {
          let token = localStorage.getItem("authToken");
          let data = localStorage.getItem("authData");

          if (!token && !data) {
            token = sessionStorage.getItem("authToken");
            data = sessionStorage.getItem("authData");
          }

          if (token && data) {
            setToken(token);
            setDataUser(JSON.parse(data));
            setIsLogged(true);
          }
        }
      } catch (error) {
        console.error("Error al verificar token:", error);
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

  const login = (token: string, dataUsuario: DataUser, rememberMe: boolean) => {
    try {
      const dataString = JSON.stringify({
        cveIdioma: dataUsuario.cveIdioma,
        cvePerfil: dataUsuario.cvePerfil,
        nombre: dataUsuario.nombre,
        idQuiniela: dataUsuario.idQuiniela,
        idParticipante: dataUsuario.idParticipante,
        idPeriodo: dataUsuario.idPeriodo,
      });

      if (rememberMe) {
        localStorage.setItem("authData", dataString);
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authData", dataString);
        sessionStorage.setItem("authToken", token);
      }

      setDataUser(dataUsuario);
      setToken(token);
      setIsLogged(true);
    } catch (error) {
      console.error("Error al guardar token:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authData");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("authData");
      setDataUser(null);
      setToken(null);
      setIsLogged(false);
    } catch (error) {
      console.error("Error al eliminar token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogged, token, dataUser, login, logout }}>
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
