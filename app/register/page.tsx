import Image from "next/image";
import Link from "next/link";
import { CodeVerification } from "@/components/register/CodeVerification";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function RegisterPage() {
  return (
    <MainContainer>
      <section className="grid py-4 items-center">
        <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 justify-items-center border border-neutral-300 rounded-2xl shadow-xs">
          <Image
            src="/images/logoNFL.png"
            width={100}
            height={130}
            alt="Logo NFL"
          />

          <CodeVerification />

          <div className="grid md:flex gap-2 justify-items-center">
            <p className="text-neutral-600">¿Ya tienes una cuenta?</p>

            <Link href="/login">
              <p className=" text-blue-600 hover:underline">Inicia sesión</p>
            </Link>
          </div>
        </div>
      </section>
    </MainContainer>
  );
}
