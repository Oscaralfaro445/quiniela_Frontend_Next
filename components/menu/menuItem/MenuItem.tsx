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
    // console.log(item.cveMenu);
    if (item.urlMenu && !item.children?.length) router.push(item.urlMenu);
  };

  // console.log(itemLevel);

  return (
    <div
      className={`flex w-full h-9 py-1 justify-between items-center px-2 rounded-md cursor-pointer ${
        currentRoute === item.urlMenu ? "bg-blue-600 text-white" : ""
      }`}
      onClick={handleClick}
    >
      <div
        className={`flex gap-4 justify-items-start items-center ml-${
          itemLevel * 4
        }`}
      >
        <div className="">
          <Icon name={item.icono} size={16} />
        </div>

        <p
          className={`text-black text-md font-semibold ${
            currentRoute === item.urlMenu ? "text-white" : ""
          }`}
        >
          {item.descMenu}
        </p>
      </div>

      <div className="flex items-center">
        {item.children?.length ? (
          <div>
            <Icon name="chevron-down" size={16} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
