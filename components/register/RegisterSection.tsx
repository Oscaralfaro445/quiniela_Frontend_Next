"use client";

import Image from "next/image";
import Link from "next/link";
import { Title } from "../shared/text/Title";
import { TextBody } from "../shared/text/TextBody";
import { RegisterForm } from "./RegisterForm";
import { MainContainer } from "../ui/containers/MainContainer";

interface RegisterSectionProps {
  idQuiniela: string;
}

export const RegisterSection = ({ idQuiniela }: RegisterSectionProps) => {
  console.log("RegisterSection idQuiniela:", idQuiniela);

  return (
    <MainContainer>
      <section className="grid items-center">
        <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 border border-neutral-300 rounded-2xl lg:shadow-xs">
          <div className="grid gap-2 justify-items-center items-center">
            <Image
              className="object-contain"
              fill
              src="/images/logoNFL.png"
              alt="Logo NFL"
            />
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
    </MainContainer>
  );
};
