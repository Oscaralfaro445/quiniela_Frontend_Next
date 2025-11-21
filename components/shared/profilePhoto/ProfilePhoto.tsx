"use client";
import { Icon } from "../icon/Icon";

interface ProfilePhotoProps {
  onClick?: () => void;
}

export const ProfilePhoto = ({ onClick }: ProfilePhotoProps) => {
  return (
    <div
      className="flex w-full h-full rounded-full p-2 bg-neutral-100 border  border-neutral-600 hover:cursor-pointer hover:bg-neutral-200 transition-colors duration-200"
      onClick={onClick}
    >
      <Icon name="user" size={40} strokeWidth={1.25} />
    </div>
  );
};
