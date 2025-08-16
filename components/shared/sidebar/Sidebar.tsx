"use client";

import { usePathname } from "next/navigation";
import useGetMenu from "@/hooks/menu/queries/useGetMenu";
import { Menu } from "@/components/shared/menu/Menu";
import { Icon } from "../icon/Icon";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export function Sidebar({ isOpen, toggle }: SidebarProps) {
  const currentRoute = usePathname();
  const menu = useGetMenu();
  const menuData = menu?.data?.data[0];

  return (
    <div
      className={`
        bg-white rounded-md shadow-md p-4 gap-4 items-start grid
        transition-transform duration-300
        fixed inset-y-4 left-4 w-64 z-50
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:w-64 h-screen
        `}
    >
      <aside>
        <div className="flex px-2 py-2 items-center justify-between">
          <p className="text-2xl font-bold">Menu</p>

          <button onClick={toggle} className="cursor-pointer">
            <Icon
              className="hover:text-red-500 transition duration-300"
              name="x"
            />
          </button>
        </div>

        {menuData && (
          <nav>
            <Menu menu={menuData} route={currentRoute} />
          </nav>
        )}
      </aside>
    </div>
  );
}
