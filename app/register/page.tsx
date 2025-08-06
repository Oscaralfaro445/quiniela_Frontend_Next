"use client";

import { RegisterForm } from "@/components/register/RegisterForm";
import { Form } from "@/components/shared/form/Form";
import * as Yup from "yup";

interface RegisterFormValues {
  CVE_USUARIO: string;
  APELLIDO_PATERNO: string;
  APELLIDO_MATERNO: string;
  NOMBRE: string;
  PASSWORD: string;
}

const initialValues: RegisterFormValues = {
  CVE_USUARIO: "",
  APELLIDO_PATERNO: "",
  APELLIDO_MATERNO: "",
  NOMBRE: "",
  PASSWORD: "",
};

const handleSubmit = (values: RegisterFormValues) => {
  console.log("Valores del formulario:", values);
};

const validationSchema = Yup.object({
  CVE_USUARIO: Yup.string().required("Campo requerido"),
  APELLIDO_PATERNO: Yup.string().required("Campo requerido"),
  APELLIDO_MATERNO: Yup.string().required("Campo requerido"),
  NOMBRE: Yup.string().required("Campo requerido"),
  PASSWORD: Yup.string().required("Campo requerido"),
});
console.log("validationSchema", validationSchema);
console.log();

export default function RegisterPage() {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <RegisterForm />
    </Form>
  );
}
