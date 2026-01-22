"use client";

import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { usePostUser } from "@/hooks/register/mutations/usePostUser";
import { RegisterFormValues } from "@/types/register/register";
import { Title } from "../shared/text/Title";
import { TextBody } from "../shared/text/TextBody";
import { Form } from "../shared/form/Form";
import { RegisterForm } from "./RegisterForm";

interface RegisterSectionProps {
  idQuiniela: string;
}

const initialValues: RegisterFormValues = {
  cveUsuario: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  nombre: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  cveUsuario: Yup.string().required("Campo requerido"),
  apellidoPaterno: Yup.string().required("Campo requerido"),
  apellidoMaterno: Yup.string().required("Campo requerido"),
  nombre: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Campo requerido"),
});

export const RegisterSection = ({ idQuiniela }: RegisterSectionProps) => {
  const register = usePostUser();

  const handleSubmit = (values: RegisterFormValues) => {
    register.mutate({ registerData: values, identificador: idQuiniela });
  };

  return (
    <section className="flex min-h-screen pt-16 items-center">
      <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 lg:border border-neutral-300 rounded-2xl lg:shadow-xs">
        <div className="grid gap-2 justify-items-center items-center">
          <Image
            src="/images/logoNFL.png"
            alt="Logo NFL"
            width={50}
            height={50}
          />
          <Title className="text-center" title="Crear Cuenta" color="blue" />
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

        <div className="grid md:flex gap-2 items-center justify-center">
          <p className="text-neutral-600">¿Ya tienes una cuenta?</p>

          <Link href="/login">
            <p className="text-center md:text-end text-blue-600 hover:underline">
              Inicia sesión
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
