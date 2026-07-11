import { InputV2Props } from "@/types/input/input";

export const InputArea = ({
  id,
  name,
  label,
  value,
  placeholder,
  disabled,
  onChange,
}: InputV2Props) => {
  return (
    <div className="grid w-full gap-1">
      {label && (
        <label className="text-md text-neutral-600" htmlFor={id}>
          {label}
        </label>
      )}

      <textarea
        className="field-sizing-content p-2 text-neutral-600 shadow-xs border border-neutral-300 rounded-md transition duration-200 hover:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};
