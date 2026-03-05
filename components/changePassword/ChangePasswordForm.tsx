"use client";

import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useChangePassword } from "@/hooks/mutations/user/useChangePassword";
import { ChangePasswordFormValues } from "@/types/changePassword/changePassword";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";
import { Title } from "../shared/text/Title";
import { TextBody } from "../shared/text/TextBody";

interface ChangePasswordFormProps {
  user: string;
}

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

export const ChangePasswordForm = ({ user }: ChangePasswordFormProps) => {
  const register = useChangePassword();

  const handleSubmit = (values: ChangePasswordFormValues) => {
    register.mutate({ user, newPassword: values.password });
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
