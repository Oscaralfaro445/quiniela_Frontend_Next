import { RefreshCcw } from "lucide-react";

export const TableHeader = () => {
  return (
    <div className="flex px-2 py-4 gap-4 items-center">
      <RefreshCcw color="black" size={18} />

      <p className="flex items-center text-base text-neutral-600">
        Resultados encontrados
      </p>
    </div>
  );
};
