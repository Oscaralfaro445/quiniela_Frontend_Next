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
    <>
      {menu.isSuccess && (
        <aside
          className={`flex flex-col p-4 gap-4 bg-white rounded-md shadow-md ${
            !isOpen && "hidden"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold py-2">Quiniela</p>

            <button onClick={toggle} className="cursor-pointer">
              <Icon name="panel-left-close" />
            </button>
          </div>

          <hr className="text-blue-600" />

          <nav>
            <Menu menu={menu.data.data} route={currentRoute} />
          </nav>
        </aside>
      )}
    </>
  );
}
