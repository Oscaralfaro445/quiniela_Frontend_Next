import { Icon } from "../icon/Icon";

export const TableHeader = () => {
  return (
    <div className="flex px-2 py-4 gap-4 items-center">
      <div>
        <Icon name="refresh-ccw" color="black" size={18} />
      </div>

      <p className="flex items-center text-sm text-neutral-600">
        Resultados encontrados
      </p>
    </div>
  );
};
