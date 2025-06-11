"use client";

import { useState } from "react";
import { MenuItemI } from "@/models/menuItemI";
import { MenuNode } from "@/components/menu/menuNode/MenuNode";

interface MenuProps {
  title: string;
  menu: MenuItemI;
  route: string;
}

export const Menu = ({ title = "Main Views", menu, route }: MenuProps) => {
  const [tree, setTree] = useState(menu);

  const handleTreeState = (menuCve: string, treeMenu: MenuItemI) => {
    if (!treeMenu.children) {
      return false;
    }

    let found = false;

    treeMenu.children.forEach((opt: MenuItemI) => {
      const currentState = opt.active;
      opt.active = handleTreeState(menuCve, opt);

      if (opt.cveMenu === menuCve) {
        found = true;
        opt.active = !currentState;
      }
    });
    return found;
  };

  const handleOptSelection = (menuCve: string) => {
    handleTreeState(menuCve, tree);
    setTree({ ...tree });
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-black text-md mr-4 font-bold w-max">{title}</h2>
        <hr />
      </div>

      <MenuNode
        route={route}
        items={tree.children as MenuItemI[]}
        handleClick={handleOptSelection}
      />
    </div>
  );
};
