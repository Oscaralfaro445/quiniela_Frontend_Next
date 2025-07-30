export type IconName =
  | "calendar"
  | "check"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevrons-left"
  | "chevrons-right"
  | "circle-check"
  | "circle-check-big"
  | "circle-x"
  | "file-question-mark"
  | "filter"
  | "gamepad-2"
  | "hand-coins"
  | "list-ordered"
  | "menu"
  | "message-circle-question-mark"
  | "panel-left-close"
  | "panel-left-open"
  | "pencil"
  | "play"
  | "plus"
  | "refresh-ccw"
  | "swords"
  | "table-properties"
  | "trash-2"
  | "trending-up"
  | "trophy"
  | "user"
  | "users"
  | "x";

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
}
