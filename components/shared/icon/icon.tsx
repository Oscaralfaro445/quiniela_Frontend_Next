import { IconProps } from "@/models/icon";
import { IconCheck } from "./icons/IconCheck";
import { IconChevronDown } from "./icons/IconChevronDown";
import { IconExclamationMark } from "./icons/IconExclamationMark";
import { IconQuestionMark } from "./icons/IconQuestionMark";
import { IconTrash } from "./icons/IconTrash";
import { IconPlus } from "./icons/IconPlus";
import { IconPencilSquare } from "./icons/IconPencilSquare";
import { IconFilter } from "./icons/IconFilter";
import { IconSync } from "./icons/IconSync";
import { IconChevronLeft } from "./icons/IconChevronLeft";
import { IconChevronRight } from "./icons/IconChevronRight";
import { IconChevronDoubleLeft } from "./icons/IconChevronDoubleLeft";
import { IconChevronDoubleRight } from "./icons/IconChevronDoubleRight";
import { IconMenu } from "./icons/IconMenu";
import { IconDefault } from "./icons/IconDefault";

export const Icon = ({ iconName, className }: IconProps) => {
  const renderIcon = () => {
    if (!iconName) return null;

    switch (iconName) {
      case "check":
        return <IconCheck className={className} />;
      case "chevronDown":
        return <IconChevronDown className={className} />;
      case "chevronLeft":
        return <IconChevronLeft className={className} />;
      case "chevronDoubleLeft":
        return <IconChevronDoubleLeft className={className} />;
      case "chevronRight":
        return <IconChevronRight className={className} />;
      case "chevronDoubleRight":
        return <IconChevronDoubleRight className={className} />;
      case "default":
        return <IconDefault className={className} />;
      case "exclamationMark":
        return <IconExclamationMark className={className} />;
      case "filter":
        return <IconFilter className={className} />;
      case "menu":
        return <IconMenu className={className} />;
      case "pencil":
        return <IconPencilSquare className={className} />;
      case "plus":
        return <IconPlus className={className} />;
      case "questionMark":
        return <IconQuestionMark className={className} />;
      case "sync":
        return <IconSync className={className} />;
      case "trash":
        return <IconTrash className={className} />;
    }
  };

  return renderIcon();
};
