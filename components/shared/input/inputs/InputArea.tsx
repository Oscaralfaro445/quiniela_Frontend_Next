import { InputProps } from "@/types/input";

export const InputArea = ({
  // placeholder,
  name,
  disabled,
  required,
  onChange,
}: // onBlur,
InputProps) => {
  return (
    <textarea
      // placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      disabled={disabled}
      required={required}
      onChange={onChange}
      // onBlur={onBlur}
      className="w-full text-gray-700 shadow-sm border border-gray-300 rounded-md px-2 py-2 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
    />
  );
};
