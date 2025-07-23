import { InputProps } from "@/models/input";

export const InputCheckbox = ({
  // placeholder,
  name,
  id,
  value,
  disabled,
  required,
  onChange,
}: InputProps) => {
  return (
    <input
      type="checkbox"
      // placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      disabled={disabled}
      required={required}
      onChange={onChange}
      className="w-full text-gray-700 shadow-sm border border-gray-300 rounded-md px-2 py-2 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    />
  );
};
