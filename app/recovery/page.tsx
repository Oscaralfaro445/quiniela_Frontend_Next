export default function RecoveryPage() {
  return (
    <>
      <></>
    </>
  );
}

/* "use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/shared/button/Button";
import { Input } from "@/components/shared/input/Input";

export default function RecoveryPage() {
  const [credentials, setCredentials] = useState({ email: "" });
  // const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setCredentials({ email: "" });
    event.preventDefault();

    console.log("Correo de recuperación: ", credentials);
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-48 2xl:px-64">
      <div className="grid gap-2 text-center p-4">
        <p className="text-5xl font-extrabold">¿Olvidaste tu contraseña?</p>
        <p className="text-lg font-semibold">
          Ingresa tu correo electrónico para recibir instrucciones de
          restablecimiento
        </p>
      </div>

      <div className="w-full justify-center py-4 px-80">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 items-center"
        >
          <Input
            type="email"
            label="Correo Electrónico"
            placeholder="Ingresa tu correo electrónico"
            name="email"
          />

          <div className="flex w-full items-center justify-between px-2">
            <p>¿Ya tienes una cuenta?</p>
            <Link href="/login">
              <p className="text-blue-600 hover:underline">Inicia sesión</p>
            </Link>
          </div>

          <Button type="submit" title="Enviar" />
        </form>
      </div>
    </div>
  );
}
 */
