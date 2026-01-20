"use client";
import Link from "next/link";
import { useState } from "react";
import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { Icon } from "../icon/Icon";
import { Button } from "@/components/shared/button/Button";
import { useLogout } from "@/hooks/logout/mutations/useLogout";

interface ProfileOptionsProps {
  data?: {
    cveUsuario: string;
    cveIdioma: string;
    cvePerfil: string;
    nombre: string;
    idQuiniela: number;
    idParticipante: number;
    idPeriodo: string;
  };
}

export const ProfileOptions = ({ data }: ProfileOptionsProps) => {
  const mutation = useLogout();
  const [showOptions, setShowOptions] = useState(false);

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <div className="relative">
      <ProfilePhoto onClick={() => setShowOptions(!showOptions)} />

      {showOptions ? (
        <div className="absolute z-50 w-60 sm:w-96  p-4 border -right-10 top-[64px] border-neutral-300 bg-white rounded-lg">
          <div className="flex gap-4 items-center">
            <ProfilePhoto />
            <div>
              <p className="text-neutral-700 font-semibold">{data?.nombre}</p>
              <p className="text-neutral-700 text-sm">{data?.cvePerfil}</p>
              <p className="text-neutral-700 text-xs">{data?.cveUsuario}</p>
            </div>
          </div>

          <div className="grid pt-4 gap-2">
            <div className="border-b border-neutral-300 pb-2">
              <Link href="/profile">
                <button
                  className="w-full p-2 rounded-lg flex items-center gap-2 hover:bg-neutral-100 ease-in-out duration-300 bg-white"
                  onClick={() => setShowOptions(false)}
                >
                  <Icon name="user" />
                  <p className=" text-xs text-black">Perfil</p>
                </button>
              </Link>
            </div>

            <div className="border-b border-neutral-300 pb-2">
              <Link href="/profile">
                <button
                  className="w-full p-2 rounded-lg flex items-center gap-2 hover:bg-neutral-100 ease-in-out duration-300 bg-white"
                  onClick={() => setShowOptions(false)}
                >
                  <Icon name="circle-question-mark" />
                  <p className=" text-xs text-black">Centro de ayuda</p>
                </button>
              </Link>
            </div>
          </div>

          <div
            className="flex pt-2 justify-end"
            onClick={() => setShowOptions(false)}
          >
            <Button
              type="button"
              title="Cerrar sesión"
              onClick={handleLogout}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
