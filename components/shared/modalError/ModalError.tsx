import { TriangleAlert, X } from "lucide-react";
import { Button } from "../button/Button";

interface ModalErrorProps {
  isModalErrorOpen: boolean;
  modalErrorContent: string[] | null;
  closeModalError: () => void;
}

export const ModalError = ({
  isModalErrorOpen,
  modalErrorContent,
  closeModalError,
}: ModalErrorProps) => {
  if (!isModalErrorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-10 py-8 bg-neutral-700/40 backdrop-blur-xs">
      <div className="relative flex flex-col w-[60vw] max-h-[60vh] p-6 gap-6 rounded-2xl shadow-2xl bg-white opacity-100 ">
        <button className="absolute top-4 right-4" onClick={closeModalError}>
          <X
            className="transition-colors duration-100 cursor-pointer hover:text-red-500"
            size={20}
          />
        </button>

        <p className="text-xl text-blue-600 font-semibold">
          Errores de validación
        </p>

        <div className="flex-1 overflow-y-auto">
          {modalErrorContent?.map((error, index) => {
            return (
              <div key={index} className="flex gap-2 items-center mt-2">
                <TriangleAlert size={16} color="red" />{" "}
                <p className="">{error}</p>
              </div>
            );
          })}
        </div>

        <div className="flex w-full justify-center">
          <Button type="button" title="Aceptar" onClick={closeModalError} />
        </div>
      </div>
    </div>
  );
};
