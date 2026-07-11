import { X } from "lucide-react";

export const ModalLateral = ({
  children,
  isModalLateralOpen,
  setIsModalLateralOpen,
}: {
  children: React.ReactNode;
  isModalLateralOpen: boolean;
  setIsModalLateralOpen: (state: boolean) => void;
}) => {
  if (!isModalLateralOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-end bg-neutral-700/40 backdrop-blur-xs">
      <div className="relative flex flex-col w-2/7 h-full p-6 gap-6  shadow-2xl bg-white opacity-100 ">
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsModalLateralOpen(false)}
        >
          <X
            className="hover:text-red-500 transition-colors duration-100 cursor-pointer"
            size={20}
          />
        </button>

        <p className="text-xl text-blue-600 font-semibold">Filtros</p>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
