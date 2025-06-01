import { InputProps } from "@/Models/input";

export const InputArea = ({
  // placeholder,
  name,
  id,
  value,
  disabled,
  required,
  onChange,
}: InputProps) => {
  return (
    <textarea
      // placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      disabled={disabled}
      required={required}
      onChange={onChange}
      className="mt-1 text-gray-700 block shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
    />
  );
};
