import clsx from "clsx";

interface TitleProps {
  className?: string;
  title: string;
  color?: "primary" | "secondary" | "danger" | "success" | "blue";
}

export const Title = ({ title, className, color = "primary" }: TitleProps) => {
  return (
    <h1
      className={clsx(
        "font-bold text-2xl md:text-4xl",
        {
          "text-neutral-700": color === "primary",
          "text-neutral-600": color === "secondary",
          "text-red-600": color === "danger",
          "text-green-600": color === "success",
          "text-blue-600": color === "blue",
        },
        className
      )}
    >
      {title}
    </h1>
  );
};
