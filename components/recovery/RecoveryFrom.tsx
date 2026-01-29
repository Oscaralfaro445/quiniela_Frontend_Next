"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRecovery } from "@/hooks/recovery/mutations/useRecovery";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";
import { Loader } from "../shared/loader/Loader";
import { StatusMessage } from "../ui/statusMessage/StatusMessage";

interface RecoveryFormValues {
  cveUsuario: string;
}

const initialValues: RecoveryFormValues = {
  cveUsuario: "",
};

const validationSchema = Yup.object({
  cveUsuario: Yup.string().required("Campo requerido").email("Email inválido"),
});

export const RecoveryForm = () => {
  const mutation = useRecovery();

  const handleSubmit = (values: RecoveryFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {mutation.isPending ? (
        <Loader />
      ) : (
        <Form className="grid w-full gap-4">
          <Input
            type="email"
            name="cveUsuario"
            label="Correo electrónico"
            placeholder="nfl@quiniela.com"
          />

          <StatusMessage
            validText="Inicio de sesión exitoso"
            invalidText="Credenciales inválidas"
            mutation={mutation}
          />

          <Button type="submit" title="Restablecer Contraseña" />
        </Form>
      )}
    </Formik>
  );
};
