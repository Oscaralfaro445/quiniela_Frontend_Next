"use client";

import { createContext, useContext, useState } from "react";
import { AlertState } from "@/types/alert/alert";
import { Alert } from "@/components/shared/alert/Alert";

interface AlertContextProps {
  showAlert: (type: AlertState, title: string, description: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [type, setType] = useState<AlertState>(AlertState.SUCCESS);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const showAlert = (type: AlertState, title: string, description: string) => {
    setType(type);
    setTitle(title);
    setDescription(description);
    setIsAlertOpen(true);

    setTimeout(() => {
      setIsAlertOpen(false);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert
        type={type}
        title={title}
        description={description}
        isModalOpen={isAlertOpen}
        toggleAlert={() => setIsAlertOpen(false)}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

  return context;
};

export default AlertProvider;
