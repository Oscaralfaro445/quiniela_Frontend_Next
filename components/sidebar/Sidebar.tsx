import { MenuItemI } from "@/models/menuItemI";
import useGetMenuData from "@/hooks/menudata/queries/useGetMenudata";
import { Menu } from "../menu/Menu";

interface SidebarProps {
  currentRoute: string;
  isOpen: boolean;
  toggle: () => void;
}

export function Sidebar({ currentRoute, isOpen, toggle }: SidebarProps) {
  const { isSuccess, isPending, isError, data, error } = useGetMenuData() as {
    isSuccess: boolean;
    isPending: boolean;
    isError: boolean;
    data: MenuItemI;
    error: Error;
  };

  // console.log(isError, isPending, isSuccess, data, error);
  console.log(error);
  console.log(data);

  return (
    <div className="h-full w-full ">
      {isPending && (
        <div>
          <h1>Cargando...</h1>
        </div>
      )}

      {isError && (
        <div>
          <h1>Erro</h1>{" "}
        </div>
      )}

      {isSuccess && (
        <aside
          className={`flex flex-col w-full h-full bg-neutral-50 text-black p-4  ${
            !isOpen && "hidden"
          }`}
        >
          <button onClick={toggle} className="">
            Cerrar
          </button>
          <nav>
            <Menu title="Prueba" menu={data} route={currentRoute} />
          </nav>
        </aside>
      )}
    </div>
  );
}
