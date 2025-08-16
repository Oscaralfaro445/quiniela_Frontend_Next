"use client";

import { AlertState } from "@/types/alert/alert";
import "./Alert.css";
import { Icon } from "../icon/Icon";

interface AlertProps {
  type: AlertState;
  title: string;
  description: string;
  isModalOpen: boolean;
  toggleAlert: () => void;
}

export const Alert = ({
  type,
  title,
  description,
  isModalOpen,
  toggleAlert,
}: AlertProps) => {
  return (
    <div
      className={`fixed flex h-22 w-86 lg:w-96  p-4 justify-between items-center rounded-lg z-50 top-4 right-4 shadow-lg border border-neutral-400 bg-white alert ${
        isModalOpen ? "active" : ""
      }`}
    >
      <div className="flex w-full gap-4 pr-8 justify-start items-center">
        {type === AlertState.SUCCESS && (
          <Icon name="circle-check" size={40} color="green" />
        )}
        {type === AlertState.ERROR && (
          <Icon name="circle-x" size={40} color="red" />
        )}
        {type === AlertState.WARNING && (
          <Icon name="circle-alert" size={40} color="#fbbf24" />
        )}

        <div className="grid">
          <h4 className="font-bold text-sm">{title}</h4>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4" onClick={toggleAlert}>
        <Icon
          name="x"
          className="cursor-pointer hover:text-red-500 transition-colors duration-200"
        />
      </div>
    </div>
  );
};
