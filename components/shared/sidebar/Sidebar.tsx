"use client";

import { usePathname } from "next/navigation";
import useGetMenu from "@/hooks/menu/queries/useGetMenu";
import { Menu } from "@/components/shared/menu/Menu";

interface SidebarProps {
  toggleSidebar: () => void;
}

export const Sidebar = ({ toggleSidebar }: SidebarProps) => {
  const currentRoute = usePathname();
  const menu = useGetMenu();
  const menuData = menu?.data?.data[0];
  // console.log("menuData", menuData);

  return (
    <div className="fixed z-50 top-18 w-full bg-white border-y border-neutral-400">
      <aside className="max-w-[1280px] mx-auto p-6">
        {menuData && (
          <nav>
            <Menu
              menu={menuData}
              route={currentRoute}
              toggleSidebar={toggleSidebar}
            />
          </nav>
        )}
      </aside>
    </div>
  );
};
