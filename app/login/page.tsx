"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/auth/mutations/useLogin";
import { Button } from "@/components/shared/button/Button";
import { Input } from "@/components/shared/input/Input";
import Link from "next/link";

export default function LoginPage() {
  const mutation = useLogin();
  // Guardaremos la información del login
  const [credentials, setCredentials] = useState({
    cveUsuario: "",
    password: "",
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
    // console.log("Input value", credentials);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(credentials);
  };

  return (
    <div className="flex flex-col w-full h-full px-36 items-center justify-center">
      <div className="text-center">
        <p className="p-2 text-5xl font-extrabold">Iniciar Sesión</p>
        <p className="p-2 text-lg font-semibold">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <div className="flex w-full justify-center p-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 items-center"
        >
          <Input
            type="text"
            label="Nombre de Usuario"
            placeholder="Ingresa tu nombre de usuario "
            name="cveUsuario"
            id="cveUsuario"
            onChange={handleChange}
          />
          <Input
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            name="password"
            id="password"
            onChange={handleChange}
          />
          <Link href="/recovery">
            <p>¿Olvidaste tu contraseña?</p>
          </Link>
          <Button type="submit" title="Iniciar sesión" />
        </form>
      </div>
    </div>
  );
}
