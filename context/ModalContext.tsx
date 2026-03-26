"use client";

import { createContext, useContext, useState } from "react";

type ModalContent = {
  title?: string;
  body: string[];
};

type ModalContextType = {
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalContent | null>(null);

  const openModal = (content: ModalContent) => setModal(content);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {modal.title && (
              <h2 className="text-lg font-semibold mb-4">{modal.title}</h2>
            )}
            <div>
              {modal?.body?.map((text, index) => (
                <p key={index} className="text-gray-700">
                  {text}
                </p>
              ))}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 text-sm text-gray-500 hover:text-gray-800"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }

  return context;
};
