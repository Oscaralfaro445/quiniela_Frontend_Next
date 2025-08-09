import clsx from "clsx";

interface TitleProps {
  title: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "danger" | "success";
}

export const Title = ({
  title,
  className,
  size = "lg",
  color = "primary",
}: TitleProps) => {
  return (
    <h1
      className={clsx(
        "font-bold",
        {
          "text-lg": size === "sm",
          "text-xl": size === "md",
          "text-3xl": size === "lg",
          "text-4xl": size === "xl",
        },
        {
          "text-gray-900": color === "primary",
          "text-gray-600": color === "secondary",
          "text-red-600": color === "danger",
          "text-green-600": color === "success",
        },
        className
      )}
    >
      {title}
    </h1>
  );
};
