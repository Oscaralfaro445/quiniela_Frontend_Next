"use client";
import clsx from "clsx";

interface ProfilePhotoProps {
  onClick?: () => void;
  className?: string;
}

export const ProfilePhoto = ({ className, onClick }: ProfilePhotoProps) => {
  return (
    <figure
      className={clsx("relative cursor-pointer", className)}
      onClick={onClick}
    >
      <div className=" w-full h-full rounded-full p-4 bg-neutral-200 dark:bg-neutral-300"></div>

      {/* <img
        src={data.imagen_usuario}
        alt="Foto de perfil"
        className="rounded-full bg-white dark:bg-neutral-950 dark:hover:brightness-50 ease-in-out duration-300"
      /> */}
    </figure>
  );
};
