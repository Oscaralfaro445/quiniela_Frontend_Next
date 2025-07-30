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
  // console.log("User data in Header:", dataUser);

  return (
    <header className="flex items-center w-full gap-6 px-4 py-2 bg-white rounded-md shadow-md">
      {isLogged && (
        <div
          onClick={toggleSidebar}
          className={
            (clsx("cursor-pointer"), isSidebarOpen ? "hidden" : "block")
          }
        >
          <Icon name="panel-left-open" />
        </div>
      )}

      <div className="flex w-full justify-between items-center">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-medium">Quiniela</h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="border-l border-gray-400 h-10 my-2 ml-2 mr-2" />{" "}
          {isLogged && dataUser ? (
            <ProfileOptions data={dataUser} />
          ) : (
            <Link href="/login">
              <Button type="button" theme="primary" title="Iniciar sesión" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
