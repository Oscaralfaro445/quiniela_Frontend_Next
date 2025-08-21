"use client";

import Link from "next/link";
import * as Yup from "yup";
import usePostLogin from "@/hooks/login/mutations/usePostLogin";
import { LoginFormValues } from "@/types/login/login";
import { Form } from "@/components/shared/form/Form";
import { LoginForm } from "@/components/login/LoginForm";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

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
    <section className="flex w-full h-screen items-center">
      <div className="grid w-full max-w-[1280px] mx-auto px-10 py-20 lg:py-32 gap-4">
        <div className="grid gap-2 justify-items-center items-center">
          <Title className="text-center" title="Iniciar Sesión" />
          <TextBody
            className="text-center"
            text="Ingresa tus credenciales para acceder a tu cuenta."
          />
        </div>

        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <LoginForm />
        </Form>

        <div className="flex w-full gap-4 items-center justify-center">
          <p>¿No tienes una cuenta?</p>

          <Link href="/register">
            <p className="text-end text-blue-600 hover:underline">
              Regístrate ahora
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

{
  /* <MainContainer>
  <SectionGrid>
    <div className="grid lg:flex w-full gap-4 justify-center lg:justify-between">
      <div className="relative w-full h-80 lg:hidden">
        <Image
          src="/images/28.png"
          alt="Imagen de ejemplo"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          priority
        />
      </div>

      <div className="relative hidden lg:block lg:w-1/3 justify-center">
        <Image
          src={"/images/28.png"}
          width={400}
          height={400}
          alt="Jugador con balón"
        />
      </div>

      <div className="grid w-full gap-4 justify-center items-center">
        <div className="grid w-full gap-4 justify-items-center items-center">
          <p className="text-5xl font-bold text-centers">Iniciar Sesión</p>
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
          <p>¿No tienes una cuenta?</p>

          <Link href="/register">
            <p className="text-blue-600 hover:underline">Regístrate ahora</p>
          </Link>
        </div>
      </div>
    </div>
  </SectionGrid>
</MainContainer>; */
}
