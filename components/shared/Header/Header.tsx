"use client";

import { useState } from "react";
import clsx from "clsx";
// import Cookie from "js-cookie";
import { Icon } from "../icon/icon";
import Link from "next/link";
import { Button } from "../button/Button";
// import useGetProfileData from "@/hooks/profileData/useGetProfileData";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Header({ isSidebarOpen, toggleSidebar }: HeaderProps) {
  // const { isSuccess, isPending, isError, data, error } = useGetProfileData();
  const [isLogged, setIsLogged] = useState(false);

  const handleLogged = () => {
    setIsLogged((prev) => !prev);
  };

  /* useEffect(() => {
    const token = Cookie.get("authToken");
    console.log("Token:", token);
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    console.log("Is Logged:", isLogged);
  }, []); */

  return (
    <header className="flex items-center w-full gap-6 px-4 py-2 bg-white rounded-md shadow-md">
      <div
        onClick={toggleSidebar}
        className={(clsx("cursor-pointer"), isSidebarOpen ? "hidden" : "block")}
      >
        <Icon name="panel-left-open" />
      </div>

      <div className="flex w-full justify-between items-center">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-medium">Quiniela</h1>
          </Link>
        </div>

        <button className="cursor-pointer" type="button" onClick={handleLogged}>
          Iniciar/Cerrar sesión
        </button>

        <div className="flex items-center gap-2">
          <div className="border-l border-gray-200 h-12 ml-1 mr-2 w-1 "></div>
          {isLogged ? (
            <></> //<ProfileOptions />
          ) : (
            <Link href="/login">
              <Button type="button" theme="primary" title="Iniciar sesión" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
