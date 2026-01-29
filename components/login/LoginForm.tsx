"use client";

import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useLogin } from "@/hooks/login/mutations/useLogin";
import { LoginFormValues } from "@/types/login/login";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";
import { Loader } from "../shared/loader/Loader";
import { StatusMessage } from "../ui/statusMessage/StatusMessage";

const initialValues: LoginFormValues = {
  cveUsuario: "",
  password: "",
};

const validationSchema = Yup.object({
  cveUsuario: Yup.string()
    .required("Campo requerido")
    .email("Clave de usuario inválida"),
  password: Yup.string()
    .required("Campo requerido")
    .min(4, "Mínimo 4 caracteres"),
});

export const LoginForm = () => {
  const mutation = useLogin();

  const handleSubmit = (values: LoginFormValues) => {
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

          <Input
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            name="password"
          />

          <StatusMessage
            validText="Inicio de sesión exitoso"
            invalidText="Credenciales inválidas"
            mutation={mutation}
          />

          <Button type="submit" title="Iniciar sesión" />

          <Link href="/recovery">
            <p className="text-center text-blue-600 hover:underline hover:text-blue-700">
              ¿Olvidaste tu contraseña?
            </p>
          </Link>
        </Form>
      )}
    </Formik>
  );
};
