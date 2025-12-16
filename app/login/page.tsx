"use client";

import Link from "next/link";
import * as Yup from "yup";
import usePostLogin from "@/hooks/login/mutations/usePostLogin";
import { LoginFormValues } from "@/types/login/login";
import { Form } from "@/components/shared/form/Form";
import { LoginForm } from "@/components/login/LoginForm";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import Image from "next/image";

const initialValues: LoginFormValues = {
  cveUsuario: "",
  password: "",
  rememberMe: false,
};

const validationSchema = Yup.object({
  cveUsuario: Yup.string().required("Campo requerido").email("Email inválido"),
  password: Yup.string()
    .required("Campo requerido")
    .min(6, "Mínimo 6 caracteres"),
  rememberMe: Yup.boolean(),
});

export default function LoginPage() {
  const login = usePostLogin();

  const handleSubmit = (values: LoginFormValues) => {
    login.mutate(values);
  };

  return (
    <div className="flex min-h-screen pt-16 items-center">
      <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 lg:border border-neutral-300 rounded-xl lg:shadow-xs">
        <div className="grid gap-2 justify-items-center items-center">
          <Image
            src="/images/logoNFL.gif"
            alt="Logo NFL"
            width={50}
            height={50}
          />
          <Title className="text-center" title="Iniciar Sesión" color="blue" />
          <TextBody
            className="text-center"
            text="Ingresa tus credenciales para iniciar sesión."
          />
        </div>

        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <LoginForm />
        </Form>

        <div className="grid md:flex gap-2 items-center justify-center">
          <p className="text-neutral-600">¿No tienes una cuenta?</p>

          <Link href="/register">
            <p className="text-center md:text-end text-blue-600 hover:underline">
              Regístrate ahora
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
