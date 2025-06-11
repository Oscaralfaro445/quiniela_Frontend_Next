import { Icon } from "../icon/icon";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  return (
    <header className="flex w-full h-16 gap-10 px-10 py-4 bg-white border-b items-center">
      {!isSidebarOpen && (
        <div onClick={toggleSidebar} className="">
          <Icon iconName="menu" />
        </div>
      )}
      <h1 className="text-xl font-bold">Panel</h1>
    </header>
  );
}
