import Link from "next/link";
import { Button } from "@/components/shared/button/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col h-full items-center justify-center overflow-x-hidden gap-4">
      <div>
        <p className="text-center text-9xl font-bold text-neutral-300">404</p>

        <p className="text-center text-xl text-neutral-500 ">
          Parece que esta página se ha perdido en el ciberespacio. ¿Quizás
          quieras intentar otro camino?
        </p>

        <p className=" text-center text-xl text-neutral-500 ">
          Si necesitas ayuda:{" "}
          <span className=" text-blue-600 cursor-pointer hover:text-green-700 ease-in-out duration-300">
            <Link href={"/dashboard"}>¡Da click aquí!</Link>
          </span>
        </p>
      </div>

      <div className=" flex w-full justify-center items-center pt-4">
        <Link href={"/dashboard"}>
          <Button type="button" title="Regresar a inicio" />
        </Link>
      </div>
    </div>
  );
}
