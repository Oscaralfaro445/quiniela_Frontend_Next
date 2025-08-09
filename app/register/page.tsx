"use client";

import * as Yup from "yup";
import usePostUser from "@/hooks/register/mutations/usePostUser";
import { RegisterFormValues } from "@/types/register/register";
import { RegisterForm } from "@/components/register/RegisterForm";
import { Form } from "@/components/shared/form/Form";
import { MainContainer } from "@/components/shared/mainContainer/MainContainer";
import { SectionGrid } from "@/components/shared/sectionGrid/SectionGrid";

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
  };

  return (
    <MainContainer>
      <SectionGrid>
        <div className="grid w-full gap-4 justify-items-center content-center">
          <p className="text-5xl font-extrabold">Crear Cuenta</p>
          <p className="text-lg font-semibold">
            Ingresa tus credenciales para crear una cuenta nueva
          </p>
        </div>

        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <RegisterForm />
        </Form>
      </SectionGrid>
    </MainContainer>
  );
}
