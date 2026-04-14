"use client";
import Link from "next/link";
import { useState } from "react";
import { ProfilePhoto } from "../profilePhoto/ProfilePhoto";
import { Icon } from "../icon/Icon";
import { Button } from "@/components/shared/button/Button";
import { useLogout } from "@/hooks/mutations/user/useLogout";
import { GetMeResponse } from "@/types/user/user.types";

interface ProfileOptionsProps {
  user: GetMeResponse | undefined;
}

export const ProfileOptions = ({ user }: ProfileOptionsProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const mutation = useLogout();

  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      mutation.mutate();
    }
  };

  return (
    <div>
      <ProfilePhoto onClick={handleShowOptions} />

      {showOptions ? (
        <div className="fixed right-16 top-18 z-50 w-60 sm:w-96 p-4 border border-neutral-300 bg-white rounded-lg">
          <div className="absolute top-2 right-2" onClick={handleShowOptions}>
            <Icon
              name="x"
              className="hover:text-red-600 hover:cursor-pointer"
            />
          </div>

          <div className="flex gap-4 items-center">
            <ProfilePhoto />

            <div>
              <p className="text-neutral-700 font-semibold">
                {user?.nombreCompleto ?? ""}
              </p>
              <p className="text-neutral-700 text-sm">
                {user?.cvePerfil ?? ""}
              </p>
              <p className="text-neutral-700 text-xs">
                {user?.cveUsuario ?? ""}
              </p>
            </div>
          </div>

          <div className="grid pt-4 gap-2">
            <div className="border-b border-neutral-300 pb-2">
              <Link href="/profile">
                <button
                  className="w-full p-2 rounded-lg flex items-center gap-2 hover:bg-neutral-100 ease-in-out duration-300 bg-white hover:cursor-pointer"
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
                  className="w-full p-2 rounded-lg flex items-center gap-2 hover:bg-neutral-100 ease-in-out duration-300 bg-white hover:cursor-pointer"
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
              theme="danger"
              onClick={handleLogout}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
