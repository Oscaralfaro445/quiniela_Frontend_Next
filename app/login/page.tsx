"use client";

import * as Yup from "yup";
import usePostLogin from "@/hooks/login/mutations/usePostLogin";
import { LoginFormValues } from "@/types/login/login";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";
import { Form } from "@/components/shared/form/Form";
import { LoginForm } from "@/components/login/LoginForm";
import Link from "next/link";

const initialValues: LoginFormValues = {
  cveUsuario: "",
  password: "",
  rememberMe: false,
};

const validationSchema = Yup.object({
  cveUsuario: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
  rememberMe: Yup.boolean(),
});

export default function LoginPage() {
  const login = usePostLogin();

  const handleSubmit = (values: LoginFormValues) => {
    login.mutate(values);
  };

  return (
    <MainContainer>
      <SectionGrid>
        <div className="grid w-full gap-4 justify-items-center content-center">
          <p className="text-5xl font-extrabold">Iniciar Sesión</p>
          <p className="text-lg font-semibold">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <LoginForm />
        </Form>

        <div className="flex w-full gap-4 items-center justify-center">
          <span>¿No tienes una cuenta?</span>

          <Link href="/register">
            <span className="text-blue-600 hover:underline">
              Regístrate ahora
            </span>
          </Link>
        </div>
      </SectionGrid>
    </MainContainer>
  );
}
