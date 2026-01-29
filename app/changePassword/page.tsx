import Image from "next/image";
import { TextBody } from "@/components/shared/text/TextBody";
import { Title } from "@/components/shared/text/Title";
import { ChangePasswordForm } from "@/components/changePassword/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <div className="flex min-h-screen pt-16 items-center">
      <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 lg:border border-neutral-300 rounded-xl lg:shadow-xs">
        <div className="grid gap-2 justify-items-center items-center">
          <Image src="/images/NFL.png" alt="Logo NFL" width={50} height={50} />
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
  );
}
