"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import usePostLogin from "@/hooks/login/mutations/usePostLogin";
import { Button } from "@/components/shared/button/Button";
import { Input } from "@/components/shared/input/Input";
import { useAlert } from "@/context/alertContext/AlertContext";
import { AlertState } from "@/models/alert";

export default function LoginPage() {
  const { showAlert } = useAlert();
  const login = usePostLogin();

  const [credentials, setCredentials] = useState({
    cveUsuario: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    if (login.isSuccess) {
      showAlert(AlertState.SUCCESS, "Operación exitosa", "Todo salió bien");
    }

    if (login.isError) {
      showAlert(
        AlertState.ERROR,
        "Error de autenticación",
        "Usuario o contraseña incorrectos"
      );
    }
  }, [login.isSuccess, login.isError, showAlert]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = event.target;
    const { name, value } = event.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setCredentials({
        ...credentials,
        [name]: target.checked,
      });
    } else {
      setCredentials({
        ...credentials,
        [name]: value,
      });
    }

    console.log("Input value", credentials);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login.mutate(credentials);
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 2xl:px-64">
      <div className="grid gap-2 text-center p-4">
        <p className="text-5xl font-extrabold">Iniciar Sesión</p>
        <p className="text-lg font-semibold">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <div className="w-full justify-center py-4">
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

          <div className="flex w-full items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                value="false"
                onChange={handleChange}
              />

              <p className="">Recordarme</p>
            </div>

            <Link href="/recovery">
              <p className="text-blue-600 hover:underline hover:text-blue-700">
                ¿Olvidaste tu contraseña?
              </p>
            </Link>
          </div>

          <Button type="submit" title="Iniciar sesión" />
        </form>
      </div>
    </div>
  );
}
