"use client";

import { Form } from "formik";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";

export const RegisterForm = () => {
  return (
    <Form className="flex flex-col w-full gap-4">
      <Input
        type="email"
        name="cveUsuario"
        label="Clave de usuario"
        placeholder="Clave de usuario"
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
        type="text"
        name="nombre"
        label="Nombre(s)"
        placeholder="Nombre(s)"
      />

      <Input
        type="password"
        name="password"
        label="Contraseña"
        placeholder="Contraseña"
      />

      <Button type="submit" title="Terminar Registro" />
    </Form>
  );
};
