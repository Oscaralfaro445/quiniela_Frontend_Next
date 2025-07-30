import { Icon } from "../../icon/Icon";

export const TableHeader = () => {
  return (
    <div className="flex items-center gap-4 px-2 py-4">
      <div onClick={() => {}}>
        <Icon name="refresh-ccw" color="black" size={18} />
      </div>

      <span className="flex items-center text-sm text-gray-700">
        Resultados encontrados
      </span>
    </div>
  );
};
