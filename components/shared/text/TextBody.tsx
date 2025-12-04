import clsx from "clsx";

interface TextBodyProps {
  text: string;
  className?: string;
  color?: "secondary" | "muted" | "danger" | "success";
  weight?: "normal" | "medium" | "semibold";
}

export const TextBody = ({
  text,
  className,
  color = "secondary",
  weight = "normal",
}: TextBodyProps) => {
  return (
    <p
      className={clsx(
        "leading-relaxed text-sm md:text-base",
        {
          "text-neutral-600": color === "secondary",
          "text-neutral-500": color === "muted",
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
