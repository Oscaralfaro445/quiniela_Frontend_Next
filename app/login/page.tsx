import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/login/LoginForm";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen pt-16 items-center">
      <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 lg:border border-neutral-300 rounded-xl lg:shadow-xs">
        <div className="grid gap-2 justify-items-center items-center">
          <Image
            src="/images/logoNFL.png"
            alt="Logo NFL"
            width={50}
            height={50}
          />
          <Title className="text-center" title="Iniciar Sesión" color="blue" />
          <TextBody
            className="text-center"
            text="Ingresa tus credenciales para iniciar sesión."
          />
        </div>

        <LoginForm />

        <div className="grid md:flex gap-2 items-center justify-center">
          <p className="text-neutral-600">¿No tienes una cuenta?</p>

          <Link href="/register">
            <p className="text-center md:text-end text-blue-600 hover:underline">
              Regístrate ahora
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
