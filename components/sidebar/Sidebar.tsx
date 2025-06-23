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

  // console.log(isError, isPending, isSuccess, data, error);
  // console.log(error);
  // console.log(data);

  return (
    <div className="h-full w-full ">
      {isPending && (
        <div>
          <h1>Cargando...</h1>
        </div>
      )}

      {isError && (
        <div>
          <h1>Error</h1>{" "}
        </div>
      )}

      {isSuccess && (
        <aside
          className={`flex flex-col h-screen bg-neutral-50 text-black p-4 justify-between ${
            !isOpen && "hidden"
          }`}
        >
          <div className="flex items-center justify-between ">
            <h1>Quiniela</h1>
            <button onClick={toggle} className="">
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
