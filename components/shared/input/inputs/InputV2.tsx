interface InputV2Props {
  id?: string;
  name?: string;
  type:
    | "TEXTO"
    | "FECHA"
    | "NUMERO"
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "search"
    | "switch";
  value?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  error?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const InputV2 = ({
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
        <label className="text-md text-neutral-600" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        className={`p-2 text-neutral-600 shadow-xs border border-neutral-300 rounded-md transition duration-200 hover:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600 ${hasError ? "border-red-500 focus:ring-red-500 hover:border-red-500" : ""}`}
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        required
      />

      {hasError && error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}
    </div>
  );
};
