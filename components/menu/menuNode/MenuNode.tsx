"use client";

import { useState } from "react";
import { MenuItemI } from "@/models/menuItemI";
import { MenuItem } from "../menuItem/MenuItem";

type MenuNodeProps = {
  items: MenuItemI[];
  route: string;
  level?: number;
  handleClick: (cve: string, tree?: string) => void;
};

export const MenuNode = ({
  items,
  route,
  level = -1,
  handleClick,
}: MenuNodeProps) => {
  const [currentLevel] = useState(level + 1);

  return (
    <div>
      {items.map((item, idx) => {
        return (
          <div key={`${item.descMenu}-${idx}`}>
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
