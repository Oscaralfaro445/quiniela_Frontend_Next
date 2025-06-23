export type IconName =
  | "chevron-down"
  | "hand-coins"
  | "list-ordered"
  | "menu"
  | "panel-left-close"
  | "panel-left-open"
  | "refresh-ccw"
  | "swords"
  | "trash-2";

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}
