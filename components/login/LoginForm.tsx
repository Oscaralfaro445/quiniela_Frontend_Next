import { Form } from "formik";
import Link from "next/link";
import { Input } from "../shared/input/Input";
import { Button } from "../shared/button/Button";

export const LoginForm = () => {
  return (
    <Form className="grid w-full gap-4">
      <Input
        type="email"
        name="cveUsuario"
        label="Nombre de Usuario"
        placeholder="Ingresa tu nombre de usuario "
      />

      <Input
        type="password"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        name="password"
      />

      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2 items-center">
          <Input type="checkbox" name="rememberMe" />
          <p className="">Recordarme</p>
        </div>

        <Link href="/">
          <p className="text-end text-blue-600 hover:underline hover:text-blue-700">
            ¿Olvidaste tu contraseña?
          </p>
        </Link>
      </div>

      <Button type="submit" title="Iniciar sesión" />
    </Form>
  );
};
