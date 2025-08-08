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
        label="Usuario"
        placeholder="Ingrese su usuario"
      />

      <Input
        type="text"
        name="apellidoPaterno"
        label="Apellido Paterno"
        placeholder="Ingrese su apellido paterno"
      />

      <Input
        type="text"
        name="apellidoMaterno"
        label="Apellido Materno"
        placeholder="Ingrese su apellido materno"
      />

      <Input
        type="text"
        name="nombre"
        label="Nombre"
        placeholder="Ingrese su nombre"
      />

      <Input
        type="password"
        name="password"
        label="Contraseña"
        placeholder="Ingrese su contraseña"
      />

      <Button type="submit" title="Terminar Registro" />
    </Form>
  );
};
