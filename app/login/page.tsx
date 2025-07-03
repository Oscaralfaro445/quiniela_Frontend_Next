"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button/Button";
import { Input } from "@/components/shared/input/Input";
import Link from "next/link";

export default function LoginPage() {
  // Guardaremos la información del login
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
    console.log("Input value", credentials);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/login",
        credentials,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.status === 200) router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full px-36 items-center justify-center">
      <div className="text-center">
        <h1 className="p-2 text-7xl ">Bienvenido</h1>
        <h4 className="p-2 text-xl">
          Ingresa a la mejor página para llenar tu quiniela...
        </h4>
      </div>
      <div className="flex w-full justify-center p-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 items-center"
        >
          <Input
            type="email"
            label="Email"
            description="Correo de inicio de sesion"
            placeholder="Ingresa tu email"
            name="email"
            id="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            label="Password"
            description="Correo de inicio de sesion"
            placeholder="Ingresa tu email"
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
