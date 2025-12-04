import Link from "next/link";
import { Button } from "@/components/shared/button/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen pt-16 gap-4 justify-center">
      <div>
        <p className="text-center text-9xl font-bold text-neutral-300">404</p>

        <p className="text-center text-xl text-neutral-600 ">
          Parece que esta página se ha perdido en el ciberespacio. ¿Quizás
          quieras intentar otro camino?
        </p>
      </div>

      <div className="flex w-full justify-center items-center">
        <Link href={"/dashboard"}>
          <Button type="button" title="Regresar a Dashboard" />
        </Link>
      </div>
    </div>
  );
}
