import { InputProps } from "@/models/input";
import { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "../../icon/icon";

interface Option {
  [key: string]: any; // Opción genérica
}

export const InputCombo = ({
  field,
  name,
  value,
  onChange,
  disabled,
}: InputProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar opciones al montar el componente
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        let data: Option[] = [];

        if (field.completeUrl) {
          const response = await fetch(field.completeUrl);
          const json = await response.json();
          data = json.data || json;
        } else if (field.endpoint) {
          const response = await fetch(
            `http://localhost:3000/api/v1/${field.endpoint}`
          );
          const json = await response.json();
          data = json.data || json;
        } else {
          data = options;
        }

        setOptions(data);
      } catch (error) {
        console.error("Error fetching combo options:", error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [field.completeUrl, field.endpoint, field.key, field.value]);

  // Manejar selección
  const handleSelect = (option: Option) => {
    const selectedValue = option[field.value];
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

  // Encontrar la opción seleccionada actualmente
  const selectedOption = options.find((opt) => opt[field.value] === value);
  console.log("selectedOption", selectedOption);

  return (
    <div className="relative w-full">
      {/* Input del combo */}
      <div
        className={`mt-1 px-4 py-2 flex justify-between items-center rounded-md border border-gray-300 bg-white shadow-sm cursor-pointer ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        // onBlur={onBlur}
        id={name}
        tabIndex={0}
      >
        <span className="text-sm font-medium text-gray-700">
          {selectedOption
            ? selectedOption[field.key]
            : "Seleccione una opción..."}
        </span>
        <Icon iconName="chevronDown" />
      </div>

      {/* Lista de opciones */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {loading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Cargando...</div>
          ) : options.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No hay opciones disponibles
            </div>
          ) : (
            <ul>
              {options.map((option) => (
                <li
                  key={option[field.value]}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    value === option[field.value]
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option[field.key]}
                  {value === option[field.value] && <Icon iconName="check" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
