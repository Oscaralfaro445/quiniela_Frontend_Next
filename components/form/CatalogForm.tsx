/* import { Form, Formik } from "formik";
import { Component } from "@/types/form/infoForm";
import { FieldValue, generateValidationSchema } from "@/utils/catalog/catalog";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";

interface Props {
  fields: Component[] | undefined;
  initialValues: Record<string, FieldValue>;
  validateForm: boolean;
  handleCancel: () => void;
  handleAccept: (data: Record<string, FieldValue>) => void;
}

export const CatalogForm = ({
  fields,
  initialValues,
  validateForm,
  handleCancel,
  handleAccept,
}: Props) => {
  // console.log(fields);

  const validationSchema = validateForm
    ? generateValidationSchema(fields || [])
    : null;

  return (
    <div className="px-2">
      <Formik
        initialValues={initialValues || {}}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleAccept(values);
        }}
      >
        <Form className="grid w-full gap-2">
          {fields?.map((component) => (
            <Input
              key={component?.nomComponente}
              id={component?.nomCampoBd ?? component?.nomComponente}
              name={component?.nomCampoBd ?? component?.nomComponente}
              type={component?.cveTipoCompon}
              label={component?.txEtiqueta}
              placeholder={component?.txAyuda}
            />
          ))}

          <div className="flex gap-2 pt-4 justify-end">
            <Button
              type="button"
              theme="danger"
              title="Cancelar"
              onClick={handleCancel}
            />

            <Button type="submit" theme="primary" title="Enviar" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
 */

export const CatalogForm = () => {
  return (
    <>
      <></>
    </>
  );
};
