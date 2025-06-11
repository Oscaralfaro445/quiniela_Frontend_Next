"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button/Button";
import { Input } from "@/components/shared/input/Input";
import Link from "next/link";

export default function RecoveryPage() {
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
        <h1 className="p-2 text-3xl w-full ">¿Olvidate tu contraseña?</h1>
      </div>
      <div className="flex w-full justify-center p-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 items-center"
        >
          <p>
            Correo electrónico para enviar instrucciones de restablecimiento
          </p>
          <Input
            type="email"
            label="Email"
            description="Correo de inicio de sesion"
            placeholder="Ingresa tu email"
            name="email"
            id="email"
            onChange={handleChange}
          />
          <Link href="/recovery">
            <p>¿Olvidaste tu contraseña?</p>
          </Link>
          <Button type="submit" title="Enviar" />
        </form>
      </div>
    </div>
  );
}
