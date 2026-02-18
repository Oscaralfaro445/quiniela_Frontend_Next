"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGetMe } from "@/hooks/getMe/queries/useGetMe";
import { Icon } from "../../shared/icon/Icon";
import { Button } from "../../shared/button/Button";
import { ProfileOptions } from "../../shared/profileOptions.tsx/ProfileOptions";
import { Sidebar } from "../sidebar/Sidebar";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: user, isLoading } = useGetMe();
  const isLoged = Boolean(user?.data);
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
            height={30}
            priority
            alt="Logo NFL"
          />

          <p className="hidden sm:block text-3xl font-semibold">
            {isLoged ? user?.data[0]?.titQuiniela : "Quiniela NFL"}
          </p>
        </Link>

        {isLoading ? null : isLoged ? (
          <div className="flex gap-2 items-center">
            <ProfileOptions user={user?.data[0]} />

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
