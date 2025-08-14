"use client";

import { useRouter } from "next/navigation";
import { MenuItemI } from "@/types/menu/menuItemI";
import { Icon } from "../../icon/Icon";

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
    <>
      {item && item.icono && (
        <div
          className={`flex w-full px-2 py-1 justify-between items-center rounded-md cursor-pointer hover:bg-neutral-200 ${
            currentRoute === item.urlMenu ? "bg-blue-600  text-white" : ""
          }`}
          onClick={handleClick}
        >
          <div className={`flex gap-4 justify-start items-center`}>
            <div className={`ml-${itemLevel * 2}`}>
              <Icon name={item.icono} size={16} />
            </div>

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
