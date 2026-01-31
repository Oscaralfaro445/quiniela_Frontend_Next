import Image from "next/image";
import { TextBody } from "@/components/shared/text/TextBody";
import { Title } from "@/components/shared/text/Title";
import { RecoveryForm } from "@/components/recovery/RecoveryFrom";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function RecoveryPage() {
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
              title="Restablecer contraseña"
              color="blue"
            />
            <TextBody
              className="text-center"
              text="Ingresa tu correo electrónico para recibir las instrucciones para restablecer tu contraseña."
            />
          </div>

          <RecoveryForm />
        </div>
      </div>
    </MainContainer>
  );
}
