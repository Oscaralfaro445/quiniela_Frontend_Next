"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGetMe } from "@/hooks/queries/user/useGetMe";
import { Icon } from "../../shared/icon/Icon";
import { Button } from "../../shared/button/Button";
import { ProfileOptions } from "../../shared/profileOptions.tsx/ProfileOptions";
import { Sidebar } from "../sidebar/Sidebar";
import { TeamLogo } from "@/components/shared/teamLogo/TeamLogo";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data } = useGetMe();
  const user = data?.data?.[0];
  console.log(user);
  const isLoged = Boolean(user);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 z-40 flex w-full h-16 px-4 py-2 justify-between items-center bg-white border-b border-neutral-400">
        <Link
          className="flex gap-2 items-center"
          href={isLoged ? "/dashboard" : "/"}
        >
          <Image
            src="/images/logoNFL.png"
            width={30}
            height={22}
            alt="Logo NFL"
          />

          <p className="hidden sm:block text-3xl font-semibold">
            {isLoged ? user?.titQuiniela : "Quiniela NFL"}
          </p>
        </Link>

        {isLoged ? (
          <div className="flex gap-2 items-center">
            {user?.idEquipoVa && user?.idEquipoVa > 0 ? (
              <Link href="/favoriteTeam">
                <TeamLogo className="scale-75" teamName={user?.nomEquipoVa} />
              </Link>
            ) : null}
            <ProfileOptions user={user} />

            <div className="h-10 mx-2 border-l border-neutral-400" />

            <div onClick={toggleSidebar}>
              <Icon
                className={`transition-colors duration-200 cursor-pointer ${isSidebarOpen ? "hover:text-red-600" : "hover:text-blue-600"}`}
                name={isSidebarOpen ? "x" : "menu"}
                size={30}
              />
            </div>
          </div>
        ) : pathname !== "/login" && pathname !== "/register" ? (
          <div className="flex gap-2">
            <Link href="/register">
              <Button type="button" title="Registrarse" theme="normal" />
            </Link>

            <Link href="/login">
              <Button type="button" title="Iniciar sesión" />
            </Link>
          </div>
        ) : null}
      </header>

      {isLoged && (
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      )}
    </>
  );
};
