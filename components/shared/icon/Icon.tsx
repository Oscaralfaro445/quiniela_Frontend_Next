import { DynamicIcon } from "lucide-react/dynamic";
import { IconProps } from "@/types/icon";

export const Icon = ({
  name,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
}: IconProps) => {
  return (
    <DynamicIcon
      name={name}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth={absoluteStrokeWidth}
    />
  );
};
