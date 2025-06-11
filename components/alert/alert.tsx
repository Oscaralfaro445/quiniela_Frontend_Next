"use client";

import { useEffect } from "react";
import { AlertState } from "@/models/alert";
import { Icon } from "../shared/icon/icon";

interface AlertProps {
  type: AlertState;
  title: string;
  description: string;
  isOpen: boolean;
  toggleAlert: () => void;
}

export const Alert = ({
  type,
  title,
  description,
  isOpen,
  toggleAlert,
}: AlertProps) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        toggleAlert();
      }, 2500);
    }
  }, [isOpen, toggleAlert]);
  return (
    <div
      className={`flex items-start absolute p-4 w-96 rounded-lg z-50 top-4 right-2 shadow-lg border border-gray-100 bg-white alert ${
        isOpen ? "active" : ""
      }`}
    >
      <div className="flex h-full">
        {type === AlertState.SUCCESS && <Icon iconName="default" />}
        {type === AlertState.ERROR && <Icon iconName="default" />}
      </div>

      <div className="flex-auto flex flex-col px-6 ">
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

      <div className="flex h-full justify-center">
        <Icon iconName="default" />
      </div>
    </div>
  );
};
