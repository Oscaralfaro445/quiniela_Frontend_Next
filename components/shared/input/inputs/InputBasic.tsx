import { InputV2Props } from "@/types/input/input";

export const InputBasic = ({
  id,
  name,
  type,
  value,
  label,
  placeholder,
  disabled,
  hasError,
  error,
  onChange,
  onBlur,
}: InputV2Props) => {
  return (
    <div className="grid w-full gap-1">
      {label && (
        <label htmlFor={id} className="text-md text-neutral-600">
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        className={`p-2 text-neutral-600 shadow-xs border border-neutral-300 rounded-md transition duration-200 hover:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600 ${hasError ? "border-red-500 focus:ring-red-500 hover:border-red-500" : ""}`}
      />

      {hasError && error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}
    </div>
  );
};
