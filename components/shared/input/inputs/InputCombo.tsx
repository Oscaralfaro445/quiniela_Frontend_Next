import { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "../../icon/Icon";

interface Option {
  llave: number;
  valor: string;
}

interface InputComboProps<T extends keyof Option> {
  data: Option[];
  name?: string;
  value?: string | number;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  optionValueKey: T;
  optionLabelKey: T;
}

export const InputCombo = <T extends keyof Option>({
  data,
  name,
  value,
  disabled = false,
  onChange = () => {},
  optionValueKey,
  optionLabelKey,
}: InputComboProps<T>) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setOptions(data);
    }
  }, [data]);

  const handleSelect = (option: Option) => {
    const selectedValue = option[optionValueKey];

    const event = {
      target: {
        name,
        value: selectedValue?.toString() || "", // Convertir a string para consistencia
      },
    } as ChangeEvent<HTMLSelectElement>;

    onChange(event);
    setIsOpen(false);
  };

  const selectedOption = options?.find((option) => {
    const optionValue = option[optionValueKey];
    return optionValue?.toString() === value?.toString();
  });

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
        <span className="text-sm font-medium text-neutral-700">
          {selectedOption
            ? selectedOption[optionLabelKey]
            : "Seleccione una opción..."}
        </span>

        <Icon
          name="chevron-down"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {!options || options.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No hay opciones disponibles
            </div>
          ) : (
            <ul>
              {options.map((option, index) => {
                const optionValue = option[optionValueKey];
                const isSelected =
                  optionValue?.toString() === value?.toString();

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
                    {option[optionLabelKey]}
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
