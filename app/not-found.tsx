import Link from "next/link";
import { Button } from "@/components/shared/button/Button";

export default function NotFound() {
  return (
    <div className=" grid pt-18 min-h-screen content-center">
      <div>
        <p className="text-center text-9xl font-bold text-neutral-300">404</p>

        <p className="text-center text-xl text-neutral-500 ">
          Parece que esta página se ha perdido en el ciberespacio. ¿Quizás
          quieras intentar otro camino?
        </p>
      </div>

      <div className=" flex w-full justify-center items-center pt-4">
        <Link href={"/dashboard"}>
          <Button type="button" title="Regresar a Dashboard" />
        </Link>
      </div>
    </div>
  );
}
