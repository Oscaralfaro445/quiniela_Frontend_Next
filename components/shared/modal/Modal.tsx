import { Icon } from "../icon/Icon";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-10 py-8 bg-neutral-700/40 backdrop-blur-xs">
      <div className="relative max-w-[1280px] max-h-[90vh] p-4 rounded-2xl shadow-2xl bg-white opacity-100 ">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <Icon
            className="hover:text-red-500 transition-colors duration-200 cursor-pointer"
            name="x"
            size={20}
          />
        </button>

        <div className="pt-6">{children}</div>
      </div>
    </div>
  );
};
