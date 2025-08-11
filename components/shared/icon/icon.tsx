import { DynamicIcon } from "lucide-react/dynamic";
import { IconProps } from "@/types/icon/icon";

export const Icon = ({
  name,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  className,
}: IconProps) => {
  return (
    <DynamicIcon
      className={className}
      name={name}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth={absoluteStrokeWidth}
    />
  );
};
