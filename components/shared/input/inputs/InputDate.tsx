import { InputProps } from "@/models/input";

export const InputDate = ({
  placeholder,
  name,
  id,
  value,
  disabled,
  required,
  onChange,
  onBlur,
}: InputProps) => {
  return (
    <input
      type="date"
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      disabled={disabled}
      required={required}
      onChange={onChange}
      onBlur={onBlur}
      className="w-full text-gray-700 shadow-sm border border-gray-300 rounded-md px-2 py-2 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 transition"
    />
  );
};
