import { Form } from "formik";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";

export const RegisterForm = () => {
  return (
    <Form className="grid w-full gap-4">
      <Input
        type="email"
        name="cveUsuario"
        label="Clave de usuario"
        placeholder="Clave de usuario"
      />

      <Input
        type="text"
        name="nombre"
        label="Nombre(s)"
        placeholder="Nombre(s)"
      />

      <Input
        type="text"
        name="apellidoPaterno"
        label="Apellido Paterno"
        placeholder="Apellido paterno"
      />

      <Input
        type="text"
        name="apellidoMaterno"
        label="Apellido Materno"
        placeholder="Apellido materno"
      />

      <Input
        type="password"
        name="password"
        label="Contraseña"
        placeholder="Contraseña"
      />

      <Input
        type="password"
        name="passwordConfirm"
        label="Confirma tu contraseña"
        placeholder="Confirma tu contraseña"
      />

      <Button type="submit" title="Terminar Registro" />
    </Form>
  );
};
