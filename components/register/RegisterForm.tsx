"use client";

import { Form } from "formik";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";

export const RegisterForm = () => {
  return (
    <Form>
      <Input
        type="text"
        name="CVE_USUARIO"
        label="Usuario"
        placeholder="Ingrese su usuario"
      />
      <Input
        type="text"
        name="APELLIDO_PATERNO"
        label="Apellido Paterno"
        placeholder="Ingrese su apellido paterno"
      />
      <Input
        type="text"
        name="APELLIDO_MATERNO"
        label="Apellido Materno"
        placeholder="Ingrese su apellido materno"
      />
      <Input
        type="text"
        name="NOMBRE"
        label="Nombre"
        placeholder="Ingrese su nombre"
      />
      <Input
        type="text"
        name="PASSWORD"
        label="Contraseña"
        placeholder="Ingrese su contraseña"
      />
      <Button type="submit" title="Terminar Registro" />
    </Form>
  );
};
