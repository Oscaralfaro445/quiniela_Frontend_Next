"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { Icon } from "../icon/icon";
import { Button } from "@/components/shared/button/Button";

interface ProfileOptionsProps {
  data: {
    cveIdioma: string;
    cvePerfil: string;
    nombre: string;
    idQuiniela: number;
    idParticipante: number;
    idPeriodo: string;
  };
}

export const ProfileOptions = ({ data }: ProfileOptionsProps) => {
  const { logout } = useAuth();
  //console.log("User data in ProfileOptions:", data);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative">
      <ProfilePhoto
        onClick={() => setShowOptions(!showOptions)}
        className="w-14 h-14"
      />

      {showOptions ? (
        <div className="absolute w-80 sm:w-96  p-4 border -right-4 top-[64px] border-neutral-300 bg-white rounded-lg z-50">
          <div className="flex justify-between">
            <div>
              <p className="text-black">{data && data.nombre}</p>
            </div>
          </div>

          <div className="pt-2">
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

            <div className="border-b border-neutral-300py-2">
              <Link href="/helpCenter">
                <button
                  className="w-full p-2 rounded-lg flex items-center gap-2 hover:bg-neutral-100 ease-in-out duration-300 bg-white"
                  onClick={() => setShowOptions(false)}
                >
                  <p className=" text-xs text-black">Centro de ayuda</p>
                </button>
              </Link>
            </div>

            <div
              className=" border-neutral-300"
              onClick={() => setShowOptions(false)}
            >
              <Link href={"/"}>
                <Button type="button" title="Cerrar sesión" onClick={logout} />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
