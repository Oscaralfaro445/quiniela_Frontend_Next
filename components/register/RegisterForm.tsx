import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";
import { usePostUser } from "@/hooks/mutations/user/usePostUser";
import {
  RegisterFormValues,
  UserCreateResponse,
} from "@/types/user/user.types";

const initialValues: RegisterFormValues = {
  cveUsuario: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  nombre: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  cveUsuario: Yup.string()
    .email("Correo electrónico inválido")
    .matches(
      /^[^A-Z]*$/,
      "El correo electrónico debe contener solo letras minúsculas (ej: juan@quiniela.com)",
    )
    .required("Campo requerido"),
  apellidoPaterno: Yup.string().required("Campo requerido"),
  apellidoMaterno: Yup.string().required("Campo requerido"),
  nombre: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
    .required("Campo requerido"),
});

interface RegisterFormProps {
  data: UserCreateResponse | undefined;
}

export const RegisterForm = ({ data }: RegisterFormProps) => {
  const mutation = usePostUser();

  const handleSubmit = (values: RegisterFormValues) => {
    mutation.mutate({ registerData: values, identificador: data?.idQuiniela });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form className="grid gap-4">
        <Input
          id="email"
          name="cveUsuario"
          type="email"
          label="Correo electrónico"
          placeholder="nfl@quiniela.com"
        />

        <Input
          id="nombre"
          name="nombre"
          type="text"
          label="Nombre(s)"
          placeholder="Juan Carlos"
        />

        <Input
          id="apellidoPaterno"
          name="apellidoPaterno"
          type="text"
          label="Apellido Paterno"
          placeholder="López"
        />

        <Input
          id="apellidoMaterno"
          name="apellidoMaterno"
          type="text"
          label="Apellido Materno"
          placeholder="Hernández"
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
        />

        <Input
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          label="Confirma tu contraseña"
          placeholder="••••••••"
        />

        {/* <StatusMessage
          validText="Inicio de sesión exitoso"
          invalidText="Credenciales inválidas"
          mutation={mutation}
        /> */}

        <Button
          type="submit"
          title={mutation?.isPending ? "Registrando..." : "Terminar registro"}
          disabled={mutation?.isPending}
        />
      </Form>
    </Formik>
  );
};
