import { Form, Formik } from "formik";
import * as Yup from "yup";
import { usePostUser } from "@/hooks/register/mutations/usePostUser";
import { RegisterFormValues } from "@/types/register/register";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";

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

export const RegisterForm = () => {
  const register = usePostUser();

  const handleSubmit = (values: RegisterFormValues) => {
    register.mutate({ registerData: values, identificador: "1" });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className="grid w-full gap-4">
        <Input
          type="email"
          name="cveUsuario"
          label="Correo electrónico"
          placeholder="nfl@quiniela.com"
        />

        <Input
          type="text"
          name="nombre"
          label="Nombre(s)"
          placeholder="Juan Carlos"
        />

        <Input
          type="text"
          name="apellidoPaterno"
          label="Apellido Paterno"
          placeholder="López"
        />

        <Input
          type="text"
          name="apellidoMaterno"
          label="Apellido Materno"
          placeholder="Hernández"
        />

        <Input
          type="password"
          name="password"
          label="Contraseña"
          placeholder="••••••••"
        />

        <Input
          type="password"
          name="passwordConfirm"
          label="Confirma tu contraseña"
          placeholder="••••••••"
        />

        <Button type="submit" title="Terminar Registro" />
      </Form>
    </Formik>
  );
};
