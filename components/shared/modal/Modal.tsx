import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
}

export const Modal = ({ children, isModalOpen, closeModal }: ModalProps) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-10 py-8 bg-neutral-700/40 backdrop-blur-xs">
      <div className="relative flex flex-col max-w-[1280px] w-full max-h-[80vh] p-6 gap-6 rounded-2xl shadow-2xl bg-white opacity-100 ">
        <button className="absolute top-4 right-4" onClick={closeModal}>
          <X
            className="hover:text-red-500 transition-colors duration-100 cursor-pointer"
            size={20}
          />
        </button>

        <p className="text-xl text-blue-600 font-semibold">
          Errores de validación
        </p>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
