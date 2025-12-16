"use client";

import { useRouter } from "next/navigation";
import { MenuItemI } from "@/types/menu/menuItemI";
import { Icon } from "../../../shared/icon/Icon";

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
    if (item.urlMenu && !item.children?.length) router.push(item.urlMenu);
  };

  return (
    <>
      {item && item.icono && (
        <div
          className={`flex w-full px-2 py-2 justify-between items-center border-b border-neutral-300 cursor-pointer rounded-sm ${
            currentRoute === item.urlMenu
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "hover:bg-neutral-200"
          }`}
          onClick={handleClick}
        >
          <div
            className={`flex gap-4 justify-start items-center ${
              itemLevel > 0 ? `pl-12` : ""
            }`}
          >
            <Icon name={item.icono} size={18} />

            <p className="text-md font-semibold">{item.descMenu}</p>
          </div>

          <div className="flex items-center">
            {item.children?.length ? (
              <div>
                <Icon name="chevron-down" size={16} />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};
