import { FormikValues, useFormikContext } from "formik";
import { InputProps } from "@/types/input/input";

export const InputCheckbox = ({
  // type
  name,
  // placeholder,
  disabled,
}: InputProps) => {
  const { values, touched, errors, handleChange, handleBlur } =
    useFormikContext<FormikValues>();
  const error = touched[name] && errors[name];

  return (
    <div>
      <input
        type="checkbox"
        name={name}
        // id={name}
        value={values[name]}
        disabled={disabled}
        // placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className="text-gray-700 shadow-sm rounded-md border border-gray-300 hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      />

      {error && <p className="text-red-500 text-sm">{error as string}</p>}
    </div>
  );
};
