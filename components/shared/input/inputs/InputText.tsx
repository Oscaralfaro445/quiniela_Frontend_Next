import { useFormikContext, FormikValues } from "formik";
import { InputProps } from "@/types/input";

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
        id={name}
        name={name}
        value={values[name]}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full  px-2 py-2 text-gray-700 shadow-sm border border-gray-300 rounded-md hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
      />

      {error && <p>{error as string} </p>}
    </div>
  );
};

/* name, type, label, placeholder, disabled, classname */
