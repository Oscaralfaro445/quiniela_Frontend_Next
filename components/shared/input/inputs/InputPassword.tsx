import { useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import { InputProps } from "@/types/input/input";
import { Icon } from "../../icon/Icon";

export const InputPassword = ({
  // type,
  name,
  placeholder,
  disabled,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<FormikValues>();
  const error = touched[name] && errors[name];

  return (
    <div className="flex flex-col w-full gap-2 items-start">
      <div className="relative flex w-full">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={name}
          value={values[name]}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-2 py-2 text-gray-700 shadow-sm border border-gray-300 rounded-md hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
        />

        <button
          className="absolute right-2 top-2"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <Icon name="eye-off" className="text-gray-500" />
          ) : (
            <Icon name="eye" className="text-gray-500" />
          )}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error as string}</p>}
    </div>
  );
};
