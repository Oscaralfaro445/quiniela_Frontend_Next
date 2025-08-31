import { Icon } from "../icon/Icon";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 px-10 py-8 content-center bg-neutral-700/40 backdrop-blur-xs">
      <div className="relative max-w-[1280px] mx-auto gap-4 w-full p-4 rounded-2xl shadow-2xl bg-white opacity-100">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <Icon
            className="transition-colors duration-200 hover:text-red-500"
            name="x"
            size={20}
          />
        </button>

        {children}
      </div>
    </div>
  );
};
