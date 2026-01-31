import Image from "next/image";
import { TextBody } from "@/components/shared/text/TextBody";
import { Title } from "@/components/shared/text/Title";
import { ChangePasswordForm } from "@/components/changePassword/ChangePasswordForm";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function ChangePasswordPage() {
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
              title="Cambia tu contraseña"
              color="blue"
            />
            <TextBody
              className="text-center"
              text="Ingresa tu nueva contraseña."
            />
          </div>

          <ChangePasswordForm />
        </div>
      </div>
    </MainContainer>
  );
}
