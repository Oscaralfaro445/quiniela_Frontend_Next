"use client";

import { useState } from "react";
import { MenuItemI } from "@/types/menu/menuItemI";
import { MenuItem } from "../menuItem/MenuItem";

type MenuNodeProps = {
  items: MenuItemI[];
  route: string;
  level?: number;
  handleClick: (cve: string) => void;
};

export const MenuNode = ({
  items,
  route,
  level = 0,
  handleClick,
}: MenuNodeProps) => {
  const [currentLevel] = useState(level + 1);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => {
        return (
          <div key={index}>
            <MenuItem
              item={item}
              itemLevel={currentLevel}
              currentRoute={route}
              handleSelect={() => handleClick(item.cveMenu)}
            />

            {item.children && item.active ? (
              <MenuNode
                items={item.children}
                route={route}
                level={currentLevel}
                handleClick={handleClick}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
