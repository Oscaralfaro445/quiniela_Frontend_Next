import usePostMenu from "@/hooks/menu/queries/usePostMenu";
import { usePathname } from "next/navigation";
import { Menu } from "@/components/shared/ui/menu/Menu";
import { Icon } from "@/components/shared/icon/Icon";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export function Sidebar({ isOpen, toggle }: SidebarProps) {
  const currentRoute = usePathname();
  const menu = usePostMenu();

  return (
    <div className="">
      {menu.isSuccess && menu.data && (
        <aside
          className={`flex flex-col bg-white text-black p-4 rounded-md shadow-md ${
            !isOpen && "hidden"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold px-2 py-2">Quiniela</p>
            <button onClick={toggle} className="cursor-pointer">
              <Icon name="panel-left-close" />
            </button>
          </div>

          <nav className="pt-4">
            <Menu menu={menu.data.data} route={currentRoute} />
          </nav>
        </aside>
      )}
    </div>
  );
}
