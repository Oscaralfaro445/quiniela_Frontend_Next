import { useFormikContext, FormikValues } from "formik";
import { Input } from "../shared/input/Input";

export const Form = ({ fields }: { fields: any[] }) => {
  const formik = useFormikContext<FormikValues>();

  return (
    <div className="w-full bg-white">
      {fields.map((field: any) => (
        <div className="pb-4" key={field.nomComponente}>
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
              <div className="text-red-500 text-xs">
                {String(formik.errors[field.nomComponente])}
              </div>
            )}
        </div>
      ))}
    </div>
  );
};
