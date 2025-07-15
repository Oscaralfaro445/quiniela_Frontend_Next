import useGetMenuData from "@/hooks/menudata/queries/useGetMenudata";
import { usePathname } from "next/navigation";
import { MenuItemI } from "@/models/menuItemI";
import { Menu } from "../menu/Menu";
import { Icon } from "../shared/icon/icon";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export function Sidebar({ isOpen, toggle }: SidebarProps) {
  const currentRoute = usePathname();
  //console.log("currentRoute", currentRoute);
  const { isSuccess, isPending, isError, data, error } = useGetMenuData() as {
    isSuccess: boolean;
    isPending: boolean;
    isError: boolean;
    data: MenuItemI;
    error: Error;
  };

  console.log(isError, isPending, isSuccess, data, error);
  console.log(error);
  // console.log(data);

  return (
    <div className="h-full w-full ">
      {isSuccess && (
        <aside
          className={`flex flex-col h-screen bg-white text-black p-4 rounded-md shadow-md justify-between ${
            !isOpen && "hidden"
          }`}
        >
          <div className="flex items-center justify-between h-16">
            <h1>Quiniela</h1>
            <button onClick={toggle} className="cursor-pointer">
              <Icon name="panel-left-close" />
            </button>
          </div>

          <nav className="h-full pt-12">
            <Menu menu={data} route={currentRoute} />
          </nav>

          <div>
            <p>Configuración</p>
            <p>Cerrar sesión </p>
          </div>
        </aside>
      )}
    </div>
  );
}
