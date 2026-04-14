import { useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import { InputV2Props } from "@/types/input/input";
import { Icon } from "../../icon/Icon";

export const InputPassword = ({
  // type,
  name,
  placeholder,
  disabled,
}: InputV2Props) => {
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
          className={`w-full px-2 py-2 text-neutral-600 shadow-xs border border-neutral-300 rounded-md hover:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600 transition-colors duration-200 ${
            error
              ? "border-red-500 focus:ring-red-500 hover:border-red-500"
              : ""
          }`}
        />

        <button
          className="absolute right-2 top-2 cursor-pointer"
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
