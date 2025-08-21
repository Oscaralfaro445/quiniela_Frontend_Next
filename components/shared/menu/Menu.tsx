"use client";

import { useState } from "react";
import { MenuItemI } from "@/types/menu/menuItemI";
import { MenuNode } from "@/components/shared/menu/menuNode/MenuNode";

interface MenuProps {
  menu: MenuItemI;
  route: string;
  toggleSidebar: () => void;
}

export const Menu = ({ menu, route }: MenuProps) => {
  const [tree, setTree] = useState<MenuItemI>(menu);

  const handleTreeState = (menuCve: string, treeMenu: MenuItemI): boolean => {
    if (!treeMenu.children) {
      return false;
    }

    let found = false;

    treeMenu.children.forEach((opt: MenuItemI) => {
      const currentState = opt.active;
      // opt.active = handleTreeState(menuCve, opt);

      if (opt.cveMenu === menuCve) {
        found = true;
        opt.active = !currentState;
      }

      // if (opt.children === null) toggleSidebar();
    });

    return found;
  };

  const handleOptSelection = (menuCve: string) => {
    handleTreeState(menuCve, tree);
    setTree({ ...tree });
  };

  return (
    <>
      {tree && (
        <MenuNode
          route={route}
          items={tree.children as MenuItemI[]}
          handleClick={handleOptSelection}
        />
      )}
    </>
  );
};
