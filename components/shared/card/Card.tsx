import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={clsx(
        "grid w-full p-4 gap-2 items-center border border-neutral-400 rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};
