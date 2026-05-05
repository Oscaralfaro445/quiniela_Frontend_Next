"use client";

import Link from "next/link";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useLogin } from "@/hooks/mutations/user/useLogin";
import { LoginVariables } from "@/types/user/user.types";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";
import { Loader } from "../shared/loader/Loader";

const initialValues: LoginVariables = {
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

  const handleSubmit = (values: LoginVariables) => {
    mutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {mutation.isPending ? (
        <Loader />
      ) : (
        <Form className="grid w-full gap-4">
          <Input
            id="email"
            type="email"
            name="cveUsuario"
            label="Correo electrónico"
            placeholder="nfl@quiniela.com"
          />

          <Input
            id="password"
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            name="password"
          />

          {/*  <StatusMessage
            validText="Inicio de sesión exitoso"
            invalidText="Credenciales inválidas"
            mutation={mutation}
          /> */}

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
