"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/authContext/AuthContext";
import { Icon } from "../../shared/icon/Icon";
import { Button } from "../../shared/button/Button";
import { ProfileOptions } from "../../shared/profileOptions.tsx/ProfileOptions";
import { Sidebar } from "../sidebar/Sidebar";
import Image from "next/image";

export const Header = () => {
  const { isLogged, dataUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 z-40 w-full h-16 px-4 py-2 bg-white border-b border-neutral-400">
        <nav className="flex h-full justify-between items-center">
          <Link href={isLogged ? "/dashboard" : "/"}>
            <div className="flex gap-4 items-center">
              <Image
                src="/images/logoNFL.gif"
                alt="Logo NFL"
                width={30}
                height={30}
              />

              <p className="hidden sm:block text-3xl font-bold">
                {dataUser ? dataUser.titQuiniela : "NFL Quiniela"}
              </p>
            </div>
          </Link>

          {isLogged ? (
            dataUser && (
              <div className="flex gap-2 items-center">
                <ProfileOptions data={dataUser} />

                <div className="h-10 mx-2 border-l border-neutral-400" />

                <div onClick={toggleSidebar}>
                  {isSidebarOpen ? (
                    <Icon
                      className="transition-colors duration-200 hover:text-red-500 cursor-pointer"
                      name="x"
                      size={30}
                    />
                  ) : (
                    <Icon
                      className="transition-colors duration-200 hover:text-blue-600 cursor-pointer"
                      name="menu"
                      size={30}
                    />
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="flex gap-2">
              <Link href="/register">
                <Button type="button" title="Registrarse" theme="normal" />
              </Link>

              <Link href="/login">
                <Button type="button" title="Iniciar sesión" />
              </Link>
            </div>
          )}
        </nav>
      </header>

      {isLogged && (
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      )}
    </>
  );
};
