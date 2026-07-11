export const InputSwitch = ({
  id,
  name,
  value,
  label,
  disabled,
  hasError,
  error,
  onChange,
  onBlur,
}: {
  id: string;
  name?: string;
  value?: boolean;
  label?: string;
  disabled?: boolean;
  hasError?: boolean;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}) => {
  return (
    <div className="grid w-full gap-1">
      <div className="flex gap-2">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={value}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          className=""
        />

        <label htmlFor={id} className="text-md text-neutral-600">
          {label}
        </label>
      </div>

      {hasError && error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}
    </div>
  );
};
