import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/login/LoginForm";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function LoginPage() {
  return (
    <MainContainer>
      <div className="grid h-full items-center">
        <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 lg:border border-neutral-300 rounded-xl lg:shadow-xs">
          <div className="grid gap-2 justify-items-center items-center">
            <div className="relative w-36 h-36">
              <Image
                className="object-contain"
                fill
                src="/images/logoNFL.png"
                alt="Logo NFL"
              />
            </div>
            <Title
              className="text-center"
              title="Iniciar sesión"
              color="blue"
            />
            <TextBody
              className="text-center"
              text="Ingresa tus credenciales para iniciar sesión."
            />
          </div>

          <LoginForm />

          <div className="flex gap-2 items-center justify-center">
            <p className="text-neutral-600">¿No tienes una cuenta?</p>

            <Link href="/register">
              <p className="text-center md:text-end text-blue-600 hover:underline">
                Regístrate ahora
              </p>
            </Link>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
