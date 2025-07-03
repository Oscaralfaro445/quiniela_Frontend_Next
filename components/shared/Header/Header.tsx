import { Icon } from "../icon/icon";
// import useGetProfileData from "@/hooks/profileData/useGetProfileData";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  // const { isSuccess, isPending, isError, data, error } = useGetProfileData();

  return (
    <header className="flex items-center w-full h-16 gap-10 px-10 py-4 bg-white rounded-md shadow-md">
      {!isSidebarOpen && (
        <div onClick={toggleSidebar} className="cursor-pointer">
          <Icon name="panel-left-open" />
        </div>
      )}

      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Quiniela</h1>
        </div>
      </div>
    </header>
  );
}

<div className="flex items-center gap-4 px-2 py-4">
  <div onClick={() => {}}>
    <Icon name="refresh-ccw" color="black" size={18} />
  </div>

  <span className="flex items-center text-sm text-gray-700">
    Resultados encontrados
  </span>
</div>;
