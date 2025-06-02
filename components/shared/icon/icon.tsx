import { IconCheck } from "./icons/IconCheck";
import { IconChevronDown } from "./icons/IconChevronDown";
import { IconExclamationMark } from "./icons/IconExclamationMark";
import { IconQuestionMark } from "./icons/IconQuestionMark";
import { IconProps } from "@/models/icon";
import { IconTrash } from "./icons/IconTrash";
import { IconPlus } from "./icons/IconPlus";
import { IconPencilSquare } from "./icons/IconPencilSquare";
import { IconFilter } from "./icons/IconFilter";
import { IconSync } from "./icons/IconSync";

export const Icon = ({ iconName }: IconProps) => {
  const renderIcon = () => {
    if (!iconName) return null;

    switch (iconName) {
      case "chevronDown":
        return <IconChevronDown />;
      case "check":
        return <IconCheck />;
      case "exclamationMark":
        return <IconExclamationMark />;
      case "filter":
        return <IconFilter />;
      case "pencil":
        return <IconPencilSquare />;
      case "plus":
        return <IconPlus />;
      case "questionMark":
        return <IconQuestionMark />;
      case "sync":
        return <IconSync />;
      case "trash":
        return <IconTrash />;
    }
  };

  return renderIcon();
};
