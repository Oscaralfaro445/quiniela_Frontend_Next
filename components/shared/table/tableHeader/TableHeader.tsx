"use client";

import { Icon } from "../../icon/icon";

export const TableHeader = () => {
  return (
    <div className="flex items-center p-y 2 px-2 mb-3">
      <div onClick={() => {}} className="pr-4">
        <Icon iconName="sync" />
      </div>
      <span className="flex items-center text-sm text-gray-700">
        Resultados encontrados
      </span>
    </div>
  );
};
