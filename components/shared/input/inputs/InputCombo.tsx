import { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "../../icon/Icon";

interface Option {
  llave: number;
  valor: string;
}

interface InputComboProps {
  data: Option[];
  name?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  optionValueKey: string;
  optionLabelKey: string | number;
}

export const InputCombo = ({
  data,
  name,
  value,
  disabled = false,
  onChange = () => {},
  optionValueKey,
  optionLabelKey,
}: InputComboProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setOptions(data);
  }, [data]);

  const handleSelect = (option: Option) => {
    const selectedValue = option[optionValueKey];

    const event = {
      target: {
        id: { name },
        name,
        value: selectedValue,
        type: "change",
      },
    } as ChangeEvent<any>;

    onChange(event);
    setIsOpen(false);
  };

  const selectedOption = options?.find(
    (option) => option[optionValueKey] === value
  );

  return (
    <div className="relative w-full">
      <div
        className={`mt-1 px-4 py-2 flex justify-between items-center rounded-md border border-gray-300 bg-white shadow-sm cursor-pointer ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        id={name}
        tabIndex={0}
      >
        <span className="text-sm font-medium text-neutral-700">
          {selectedOption
            ? selectedOption[optionLabelKey]
            : "Seleccione una opción..."}
        </span>

        <Icon name="chevron-down" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options?.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No hay opciones disponibles
            </div>
          ) : (
            <ul>
              {options?.map((option, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    true ? "bg-white text-black" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.valor}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
