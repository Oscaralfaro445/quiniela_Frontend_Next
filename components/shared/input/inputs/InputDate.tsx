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
      className="mt-1 text-gray-700 block shadow-sm sm:text-sm focus:border-indigo-700 border-gray-300 rounded-md focus:ring-0"
    />
  );
};
