"use client";

import { AlertState } from "@/types/alert";
import { Icon } from "../icon/Icon";
import "./Alert.css";

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
      className={`fixed flex justify-between items-start p-4 w-86 lg:w-96 rounded-lg z-50 top-4 right-4 shadow-lg border border-green-600 bg-white alert ${
        isModalOpen ? "active" : ""
      }`}
    >
      <div className="flex h-full justify-center">
        {type === AlertState.SUCCESS && (
          <Icon name="circle-check" size={40} color="green" />
        )}
        {type === AlertState.ERROR && (
          <Icon name="circle-x" size={40} color="red" />
        )}
      </div>

      <div className="flex flex-col">
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

      <div className="" onClick={toggleAlert}>
        <Icon name="x" color="red" />
      </div>
    </div>
  );
};
