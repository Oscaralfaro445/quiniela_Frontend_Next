"use client";

import { useEffect } from "react";
import { AlertState } from "@/models/alert";
import { Icon } from "../shared/icon/icon";
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
  useEffect(() => {
    if (isModalOpen) {
      const timeout = setTimeout(() => {
        toggleAlert();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isModalOpen, toggleAlert]);

  return (
    <div
      className={`flex items-start p-4 w-96 rounded-lg absolute z-50 top-4 right-2 shadow-lg border border-gray-100 bg-white alert ${
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

      <div className="flex-auto flex flex-col px-6 ">
        <h4 className="font-bold text-sm">{title}</h4>
        <p className="text-xs text-gray-400">{description}</p>
      </div>

      <div className="flex h-full justify-center">
        <Icon name="check" />
      </div>
    </div>
  );
};
