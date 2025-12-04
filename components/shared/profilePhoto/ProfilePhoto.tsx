"use client";
import Image from "next/image";

interface ProfilePhotoProps {
  onClick?: () => void;
}

export const ProfilePhoto = ({ onClick }: ProfilePhotoProps) => {
  return (
    <div
      className="rounded-full border p-1 border-neutral-600 hover:cursor-pointer"
      onClick={onClick}
    >
      <Image src="/images/user.png" alt="user photo" width={35} height={35} />
    </div>
  );
};
