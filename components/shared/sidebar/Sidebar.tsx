import { usePathname } from "next/navigation";
import useGetMenu from "@/hooks/menu/queries/useGetMenu";
import { Menu } from "@/components/shared/menu/Menu";
import { Icon } from "@/components/shared/icon/Icon";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export function Sidebar({ isOpen, toggle }: SidebarProps) {
  const currentRoute = usePathname();
  const menu = useGetMenu();
  console.log("Menu data: ", menu?.data?.data);

  return (
    <>
      {menu.isSuccess && (
        <aside
          className={`flex flex-col h-[803px] p-4 gap-4 bg-white rounded-md shadow-md ${
            !isOpen && "hidden"
          }`}
        >
          <div className="flex px-2 py-2 items-center justify-between">
            <p className="text-2xl font-bold">Menu</p>

            <button onClick={toggle} className="cursor-pointer">
              <Icon name="x" />
            </button>
          </div>

          <hr className="text-blue-600" />

          <nav>
            <Menu menu={menu.data.data[0]} route={currentRoute} />
          </nav>
        </aside>
      )}
    </>
  );
}
