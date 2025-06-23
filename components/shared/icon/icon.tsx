import { DynamicIcon } from "lucide-react/dynamic";
import { IconProps } from "@/models/icon";

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
