"use client";

import Image from "next/image";
import Link from "next/link";
import { Title } from "../shared/text/Title";
import { TextBody } from "../shared/text/TextBody";
import { RegisterForm } from "./RegisterForm";

interface RegisterSectionProps {
  idQuiniela: string;
}

export const RegisterSection = ({ idQuiniela }: RegisterSectionProps) => {
  console.log("RegisterSection idQuiniela:", idQuiniela);

  return (
    <section className="flex min-h-screen pt-16 items-center">
      <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 lg:border border-neutral-300 rounded-2xl lg:shadow-xs">
        <div className="grid gap-2 justify-items-center items-center">
          <Image src="/images/NFL.png" alt="Logo NFL" width={50} height={50} />
          <Title className="text-center" title="Crear Cuenta" color="blue" />
          <TextBody
            className="text-center"
            text="Ingresa tus credenciales para crear una cuenta nueva."
          />
        </div>

        <RegisterForm />

        <div className="grid md:flex gap-2 items-center justify-center">
          <p className="text-neutral-600">¿Ya tienes una cuenta?</p>

          <Link href="/login">
            <p className="text-center md:text-end text-blue-600 hover:underline">
              Inicia sesión
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
