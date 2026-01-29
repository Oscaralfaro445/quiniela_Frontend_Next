import Image from "next/image";
import { TextBody } from "@/components/shared/text/TextBody";
import { Title } from "@/components/shared/text/Title";
import { RecoveryForm } from "@/components/recovery/RecoveryFrom";

export default function RecoveryPage() {
  return (
    <div className="flex min-h-screen pt-16 items-center">
      <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 lg:border border-neutral-300 rounded-xl lg:shadow-xs">
        <div className="grid gap-2 justify-items-center items-center">
          <Image src="/images/NFL.png" alt="Logo NFL" width={50} height={50} />
          <Title
            className="text-center"
            title="Restablecer Contraseña"
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
  );
}
