"use client";

import { createContext, useContext, useState } from "react";
import { ModalError } from "@/components/shared/modalError/ModalError";

type ModalErrorContextType = {
  isModalErrorOpen: boolean;
  modalErrorContent: string[] | null;
  openModalError: (error: string[] | null) => void;
  closeModalError: () => void;
};

const ModalErrorContext = createContext<ModalErrorContextType | null>(null);

export const ModalErrorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isModalErrorOpen, setIsModalErrorOpen] = useState<boolean>(false);
  const [modalErrorContent, setModalErrorContent] = useState<string[] | null>(
    null,
  );

  const openModalError = (error: string[] | null) => {
    setModalErrorContent(error);
    setIsModalErrorOpen(true);
  };

  const closeModalError = () => {
    setModalErrorContent(null);
    setIsModalErrorOpen(false);
  };

  return (
    <ModalErrorContext.Provider
      value={{
        isModalErrorOpen,
        modalErrorContent,
        openModalError,
        closeModalError,
      }}
    >
      {children}
      <ModalError
        isModalErrorOpen={isModalErrorOpen}
        modalErrorContent={modalErrorContent}
        closeModalError={closeModalError}
      />
    </ModalErrorContext.Provider>
  );
};

export const useError = (): ModalErrorContextType => {
  const context = useContext(ModalErrorContext);

  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }

  return context;
};
