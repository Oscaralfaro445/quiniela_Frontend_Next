"use client";

import { useRouter } from "next/navigation";
import { MenuItemI } from "@/models/menuItemI";
import { Icon } from "@/components/shared/icon/icon";

type MenuItemProps = {
  item: MenuItemI;
  itemLevel: number;
  currentRoute: string;
  handleSelect: (cve: string, tree?: string) => void;
};

export const MenuItem = ({
  item,
  itemLevel,
  currentRoute,
  handleSelect,
}: MenuItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    handleSelect(item.cveMenu);
    console.log(item.cveMenu);
    if (item.urlMenu && !item.children?.length) router.push(item.urlMenu);
  };

  return (
    <div
      className={`w-full h-9 mb-1 flex justify-between items-center px-2 rounded-md cursor-pointer ${
        currentRoute === item.urlMenu ? "bg-gray-200" : ""
      }`}
      onClick={handleClick}
    >
      <div
        className={`flex justify-items-start items-center pl-${itemLevel * 4}`}
      >
        <div className="w-8">
          <Icon />
        </div>
        <p className="text-black text-md font-semibold">{item.descMenu}</p>
      </div>

      <div className="flex items-center">
        {item.children?.length ? (
          <div className="w-max text-center">
            <Icon iconName="check" />
          </div>
        ) : null}
      </div>
    </div>
  );
};
