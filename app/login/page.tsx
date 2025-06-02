"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button/Button";
import { Input } from "@/components/shared/input/Input";

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
    <div>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" title="Iniciar sesión" />
      </form>
    </div>
  );
}
