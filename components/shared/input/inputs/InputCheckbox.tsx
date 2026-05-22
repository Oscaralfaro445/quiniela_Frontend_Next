/* import { FormikValues, useFormikContext } from "formik";
import { InputV2Props } from "@/types/input/input";

export const InputCheckbox = ({
  // type
  name,
  // placeholder,
  disabled,
}: InputV2Props) => {
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
        className="text-neutral-700 shadow-sm rounded-md border border-neutral-300 hover:border-blue-600 focus:outline-none focus:ring focus:ring-blue-600 transition"
      />

      {error && <p className="text-red-500 text-sm">{error as string}</p>}
    </div>
  );
};
 */
