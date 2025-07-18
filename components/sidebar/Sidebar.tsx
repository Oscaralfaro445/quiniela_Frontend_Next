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
  // console.log(error);
  // console.log(data);

  return (
    <div className="">
      {isSuccess && (
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
            <Menu menu={data} route={currentRoute} />
          </nav>
        </aside>
      )}
    </div>
  );
}
