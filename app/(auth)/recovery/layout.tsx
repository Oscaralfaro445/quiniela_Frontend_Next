import Image from "next/image";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <div className="relative w-3/5 h-screen">
        <Image
          src="/images/login.jpg"
          fill
          className="object-cover"
          alt="Estadio de football"
        />
      </div>

      <div className="flex h-screen w-full p-36 items-center justify-center ">
        {children}
      </div>
    </div>
  );
}
