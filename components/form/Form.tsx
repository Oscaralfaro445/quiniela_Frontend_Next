import { useFormikContext, FormikValues } from "formik";
import { Input } from "../shared/input/Input";

export const Form = ({ fields }: { fields: any[] }) => {
  const formik = useFormikContext<FormikValues>();
  return (
    <div className="w-full bg-white p-4 ">
      {fields.map((field: any) => (
        <div key={field.nomComponente}>
          <Input
            field={field}
            name={field.nomComponente}
            id={field.nomComponente}
            value={formik.values[field.nomComponente]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={field.isDisabled}
          />

          {formik.touched[field.nomComponente] &&
            formik.errors[field.nomComponente] && (
              <div className="text-red-500 text-sm mt-1">
                {String(formik.errors[field.nomComponente])}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};
