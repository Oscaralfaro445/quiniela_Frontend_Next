import { ChangeEvent, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  llave: number | string;
  valor: string;
}

interface InputComboProps {
  id: string;
  name?: string;
  selected: number | string;
  label?: string;
  disabled?: boolean;
  data: Option[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const InputCombo = ({
  id,
  name,
  selected,
  label,
  disabled,
  data,
  onChange,
}: InputComboProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isComboOpen, setIsComboOpen] = useState<boolean>(false);

  console.log(data);

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
    setIsComboOpen(false);
  };

  const optionValue = options.find(
    (option) => option.llave === selected,
  )?.valor;

  return (
    <div className="grid w-full gap-1">
      {label && (
        <label htmlFor={id} className="text-md text-neutral-600">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <div
          id={id}
          tabIndex={0}
          onClick={() => !disabled && setIsComboOpen(!isComboOpen)}
          className={`mt-1 p-2 flex justify-between items-center rounded-md border border-gray-300 bg-white shadow-xs cursor-pointer transition-colors ${
            disabled
              ? "bg-gray-100 cursor-not-allowed"
              : "hover:border-gray-400"
          }`}
        >
          {selected === 0 || selected === " " ? (
            <p className="text-neutral-400">Selecciona una opcion...</p>
          ) : (
            <p className="text-neutral-700">{optionValue}</p>
          )}

          <ChevronDown
            className={`transition-transform ${isComboOpen ? "rotate-180" : ""}`}
          />
        </div>

        {isComboOpen && (
          <div className="absolute z-10 top-14 w-full bg-white border border-neutral-500 rounded-md shadow-xs max-h-60 overflow-auto">
            {!options || options.length === 0 ? (
              <p className="px-4 py-2 text-sm text-neutral-600">
                No hay opciones disponibles
              </p>
            ) : (
              <ul className="grid divide-y divide-neutral-300 ">
                {options.map((option, index) => {
                  const optionValue = option["llave"];
                  const isSelected = optionValue === selected;

                  return (
                    <li
                      key={optionValue?.toString() || index}
                      onClick={() => handleSelect(option)}
                      className={`p-2 text-sm cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white font-medium"
                          : "hover:bg-blue-200 text-neutral-700"
                      }`}
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
    </div>
  );
};
