import clsx from "clsx";

interface TextBodyProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "muted" | "danger" | "success";
  weight?: "normal" | "medium" | "semibold";
}

export const TextBody = ({
  text,
  className,
  size = "lg",
  color = "secondary",
  weight = "normal",
}: TextBodyProps) => {
  return (
    <p
      className={clsx(
        "leading-relaxed",
        {
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg",
        },
        {
          "text-gray-900": color === "primary",
          "text-gray-600": color === "secondary",
          "text-gray-500": color === "muted",
          "text-red-600": color === "danger",
          "text-green-600": color === "success",
        },
        {
          "font-normal": weight === "normal",
          "font-medium": weight === "medium",
          "font-semibold": weight === "semibold",
        },
        className
      )}
    >
      {text}
    </p>
  );
};
