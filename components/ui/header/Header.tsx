"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/authContext/AuthContext";
import { Icon } from "../../shared/icon/Icon";
import { Button } from "../../shared/button/Button";
import { ProfileOptions } from "../../shared/profileOptions.tsx/ProfileOptions";
import { Sidebar } from "../sidebar/Sidebar";

export const Header = () => {
  const { isLogged, dataUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 z-40 w-full h-18 px-6 py-4 bg-white border-b border-neutral-400">
        <nav className="flex max-w-[1280px] mx-auto justify-between items-center">
          <Link href={isLogged ? "/dashboard" : "/"}>
            <div className="flex gap-2 items-center">
              <Icon name="trophy" size={30} className="text-blue-600" />
              <span className="hidden sm:block text-3xl font-bold">
                {dataUser ? dataUser.titQuiniela : "NFL Quiniela"}
              </span>
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
                      className="transition-colors duration-200 hover:text-red-500"
                      name="x"
                      size={30}
                    />
                  ) : (
                    <Icon name="menu" size={30} />
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
