import Image from "next/image";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import { TokenVerification } from "@/components/changePassword/TokenVerification";

interface ChangePasswordPageProps {
  searchParams: Promise<{ token: string }>;
}

export default async function ChangePasswordPage({
  searchParams,
}: ChangePasswordPageProps) {
  const token = (await searchParams)?.token;

  return (
    <MainContainer>
      <div className="grid h-full items-center">
        <div className="grid w-full max-w-[768px] mx-auto px-4 py-8 gap-4 border border-neutral-300 rounded-xl lg:shadow-xs">
          <div className="grid gap-2 justify-items-center items-center">
            <Image
              src="/images/logoNFL.png"
              width={100}
              height={130}
              alt="Logo NFL"
            />
          </div>
          <TokenVerification token={token} />
        </div>
      </div>
    </MainContainer>
  );
}
