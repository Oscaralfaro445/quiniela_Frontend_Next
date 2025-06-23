import { Icon } from "../icon/icon";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  profileData?: any;
}

export function Header({
  toggleSidebar,
  isSidebarOpen,
  profileData,
}: HeaderProps) {
  return (
    <header className="flex w-full h-16 gap-10 px-10 py-4 bg-white border-b items-center">
      {!isSidebarOpen && (
        <div onClick={toggleSidebar} className="">
          <Icon name="panel-left-open" />
        </div>
      )}
      <div className="flex w-full justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Panel</h1>
        </div>
        {profileData && (
          <div className="flex w-80 gap-4 justify-center">
            <h1>{profileData?.username}</h1>
            <h1>{profileData?.email}</h1>
          </div>
        )}
      </div>
    </header>
  );
}
