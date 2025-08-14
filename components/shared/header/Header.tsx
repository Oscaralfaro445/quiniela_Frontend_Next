"use client";

import clsx from "clsx";
import Link from "next/link";
import { Icon } from "../icon/Icon";
import { Button } from "../button/Button";
import { useAuth } from "@/context/authContext/AuthContext";
import { ProfileOptions } from "../profileOptions.tsx/ProfileOptions";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const { isLogged, dataUser } = useAuth();

  return (
    <header className="flex items-center w-full gap-6 py-4 px-4 sm:px-8 md:px-16 bg-white rounded-md shadow-md">
      {isLogged && (
        <div
          onClick={toggleSidebar}
          className={
            (clsx("cursor-pointer"), isSidebarOpen ? "hidden" : "block")
          }
        >
          <Icon name="menu" />
        </div>
      )}

      <div className="flex w-full justify-between items-center">
        <Link href="/">
          <div className="flex gap-4 items-center">
            <Icon name="trophy" size={30} color="blue" />
            <p className="text-3xl font-bold">NFL Quiniela</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isLogged && (
            <span className="text-md text-gray-600">
              Semana {dataUser?.idPeriodo}
            </span>
          )}

          <div className="border-l border-blue-600 h-10 my-2 ml-2 mr-2" />

          {isLogged && dataUser ? (
            <ProfileOptions data={dataUser} />
          ) : (
            <Link href="/login">
              <Button type="button" title="Iniciar sesión" icon="log-in" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
