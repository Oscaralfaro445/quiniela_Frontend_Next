"use client";

import { usePathname } from "next/navigation";
import { useGetMenu } from "@/hooks/queries/useGetMenu";
import { Menu } from "@/components/ui/menu/Menu";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ toggleSidebar, isSidebarOpen }: SidebarProps) => {
  const currentRoute = usePathname();
  const { data } = useGetMenu();
  const menuData = data?.data?.[0];

  return (
    <div
      className={`fixed z-30 top-16 w-full bg-white border-b border-neutral-300 transform transition-transform duration-300 ease-in-out shadow-sm shadow-neutral-200 ${
        isSidebarOpen ? "" : "-translate-y-full"
      }`}
    >
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
