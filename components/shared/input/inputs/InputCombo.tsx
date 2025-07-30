import { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "../../icon/Icon";

interface InputComboProps {
  data: any;
  name: string;
  value: string | number;
  disabled: boolean;
  onchange: () => {};
}

interface Option {
  [key: string]: string | number; // Opción genérica
}

export const InputCombo = ({
  // field,
  data,
  name,
  value,
  disabled,
  onChange,
}: InputComboProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [loading, setLoading] = useState(false);

  // Cargar opciones al montar el componente
  useEffect(() => {
    const fetchOptions = async () => {
      // setLoading(true);
      try {
        setOptions(data);
        console.log("Opciones del componente combo:", options);
      } catch (error) {
        console.error("Error fetching combo options:", error);
        setOptions([]);
      } finally {
        // setLoading(false);
      }
    };

    fetchOptions();
  }, [data]);

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
  // const selectedOption = options.find((opt) => opt[field.value] === value);
  // console.log("selectedOption", selectedOption);

  return (
    <div className="relative w-full">
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
          {/* {selectedOption
            ? selectedOption[field.key]
            : "Seleccione una opción..."} */}
        </span>
        <Icon name="chevron-down" />
      </div>

      {/* Lista de opciones */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {false ? (
            <div className="px-4 py-2 text-sm text-gray-500">Cargando...</div>
          ) : options?.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No hay opciones disponibles
            </div>
          ) : (
            <ul>
              {options?.map((option, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    true ? "bg-blue-100 text-black" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.value}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
