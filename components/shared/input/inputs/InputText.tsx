import { FormikValues, useFormikContext } from "formik";
import { InputProps } from "@/types/input/input";

export const InputText = ({
  // type,
  name,
  placeholder,
  disabled,
}: InputProps) => {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<FormikValues>();
  const error = touched[name] && errors[name];

  return (
    <div className="flex flex-col w-full gap-2 items-start">
      <input
        type="text"
        name={name}
        id={name}
        value={values[name]}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full px-2 py-2 text-neutral-600 shadow-xs border border-neutral-300 rounded-md hover:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600 transition-colors duration-200 ${
          error ? "border-red-500 focus:ring-red-500 hover:border-red-500" : ""
        }`}
      />

      {error && <p className="text-red-500 text-sm">{error as string}</p>}
    </div>
  );
};
