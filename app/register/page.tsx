"use client";

import Link from "next/link";
import * as Yup from "yup";
import usePostUser from "@/hooks/register/mutations/usePostUser";
import { RegisterFormValues } from "@/types/register/register";
import { RegisterForm } from "@/components/register/RegisterForm";
import { Form } from "@/components/shared/form/Form";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

const initialValues: RegisterFormValues = {
  cveUsuario: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  nombre: "",
  password: "",
};

const validationSchema = Yup.object({
  cveUsuario: Yup.string().required("Campo requerido"),
  apellidoPaterno: Yup.string().required("Campo requerido"),
  apellidoMaterno: Yup.string().required("Campo requerido"),
  nombre: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
});

export default function RegisterPage() {
  const register = usePostUser();

  const handleSubmit = (values: RegisterFormValues) => {
    register.mutate(values);
    console.log("Values:", values);
  };

  return (
    <>
      <section className="flex w-full md:h-[calc(100vh-72px)] items-center">
        <div className="grid w-full max-w-[1280px] mx-auto px-10 py-20 lg:py-32 gap-4">
          <div className="grid gap-2 justify-items-center items-center">
            <Title className="text-center" title="Crear Cuenta" />
            <TextBody
              className="text-center"
              text="Ingresa tus credenciales para crear una cuenta nueva."
            />
          </div>

          <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <RegisterForm />
          </Form>

          <div className="flex w-full gap-4 items-center justify-center">
            <p>¿Ya tienes una cuenta?</p>

            <Link href="/login">
              <p className="text-blue-600 hover:underline">Inicia sesión</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
