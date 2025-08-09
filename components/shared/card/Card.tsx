import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        "grid w-full p-6 gap-4 justify-items-center content-center border border-neutral-400 rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};
