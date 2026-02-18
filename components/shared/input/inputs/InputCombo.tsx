import { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "../../icon/Icon";

interface Option {
  llave: number;
  valor: string;
}

interface InputComboProps {
  data: Option[];
  name?: string;
  selected?: number;
  value?: string | number;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const InputCombo = ({
  data,
  name,
  selected,
  value,
  disabled,
  onChange = () => {},
}: InputComboProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setOptions(data);
    }
  }, [data]);

  const handleSelect = (option: Option) => {
    const selectedValue = option["llave"];

    const event = {
      target: {
        name,
        value: selectedValue?.toString() || "",
      },
    } as ChangeEvent<HTMLSelectElement>;

    onChange(event);
    setIsOpen(false);
  };

  const optionName = options.find((option) => option.llave === selected)?.valor;

  return (
    <div className="relative w-full">
      <div
        className={`mt-1 px-4 py-2 flex justify-between items-center rounded-md border border-gray-300 bg-white shadow-sm cursor-pointer transition-colors ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "hover:border-gray-400"
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        id={name}
        tabIndex={0}
      >
        <p className="text-sm font-medium text-neutral-700">
          {value === " "
            ? selected === 0
              ? "Selecciona una opcion..."
              : optionName
            : value}
        </p>

        <Icon
          name="chevron-down"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 top-12 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {!options || options.length === 0 ? (
            <p className="px-4 py-2 text-sm text-gray-500">
              No hay opciones disponibles
            </p>
          ) : (
            <ul className="grid divide-y divide-neutral-200 px-2 ">
              {options.map((option, index) => {
                const optionValue = option["llave"];
                const isSelected = optionValue === selected;

                return (
                  <li
                    key={optionValue?.toString() || index}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-blue-100 text-blue-900 font-medium"
                        : "hover:bg-gray-100 text-gray-900"
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {option["valor"]}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
