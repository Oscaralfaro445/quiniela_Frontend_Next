import { InputProps } from "@/models/input";

export const InputPassword = ({
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
      type="password"
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      disabled={disabled}
      required={required}
      onChange={onChange}
      onBlur={onBlur}
      className="mt-1 text-gray-500 block shadow-sm sm:text-sm border-gray-300 focus:border-indigo-700 rounded-md focus:ring-0"
    />
  );
};
