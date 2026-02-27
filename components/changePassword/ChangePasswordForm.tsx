"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
// import { usePostUser } from "@/hooks/register/mutations/usePostUser";
import { ChangePasswordFormValues } from "@/types/changePassword/changePassword";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";
import { Title } from "../shared/text/Title";
import { TextBody } from "../shared/text/TextBody";

const initialValues: ChangePasswordFormValues = {
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  password: Yup.string().required("Campo requerido"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Campo requerido"),
});

export const ChangePasswordForm = () => {
  // const register = usePostUser();

  const handleSubmit = (values: ChangePasswordFormValues) => {
    // register.mutate(values);
    console.log(values);
  };

  return (
    <div>
      <Title
        className="text-center"
        title="Cambia tu contraseña"
        color="blue"
      />
      <TextBody className="text-center" text="Ingresa tu nueva contraseña." />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="grid w-full gap-4">
          <Input
            type="password"
            name="password"
            label="Nueva contraseña"
            placeholder="••••••••"
          />

          <Input
            type="password"
            name="passwordConfirm"
            label="Confirma tu nueva contraseña"
            placeholder="••••••••"
          />

          <Button type="submit" title="Cambiar contraseña" />
        </Form>
      </Formik>
    </div>
  );
};
