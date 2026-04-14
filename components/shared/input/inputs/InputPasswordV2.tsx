import { useState } from "react";
import { InputV2Props } from "@/types/input/input";
import { Icon } from "../../icon/Icon";

export const InputPasswordV2 = ({
  id,
  name,
  value,
  label,
  placeholder,
  disabled,
  hasError,
  error,
  onChange,
  onBlur,
}: InputV2Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="grid w-full gap-1">
      {label && (
        <label className="text-md text-neutral-600" htmlFor={id}>
          {label}
        </label>
      )}

      <div className="relative flex w-full">
        <input
          className={`w-full p-2 text-neutral-600 shadow-xs border border-neutral-300 rounded-md transition duration-200 hover:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600 ${hasError ? "border-red-500 focus:ring-red-500 hover:border-red-500" : ""}`}
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />

        <button
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Icon name="eye-off" color="gray" />
          ) : (
            <Icon name="eye" color="gray" />
          )}
        </button>
      </div>

      {hasError && error && (
        <p className="text-red-500 text-sm font-medium">{error}</p>
      )}
    </div>
  );
};
