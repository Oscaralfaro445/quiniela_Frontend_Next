import { IconName } from "@/types/icon/icon";
import { Icon } from "../icon/Icon";

interface ButtonProps {
  type: "button" | "reset" | "submit";
  theme?: string;
  title?: string;
  icon?: IconName;
  flow?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  type,
  theme = "primary",
  title,
  icon,
  flow = "",
  // loading = false,
  disabled,
  onClick,
}: ButtonProps) => {
  const themes: { [key: string]: string } = {
    primary:
      "inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700",
    // secondary: "py-2 px-4 rounded-lg bg-indigo-200 text-indigo-700 font-medium",
    normal:
      "inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm border-blue-800 font-medium text-blue-800 bg-white hover:bg-neutral-100",
    pill: "py-1 px-2 rounded-full bg bg-indigo-200 text-indigo-700 text-sm font-medium",
    success:
      "inline-flex text-gray-800 items-center px-3  border-gray-300 mr-2 py-1 border rounded-md shadow-sm text-xs font-medium text-gray-500 bg-gray-50",
    danger:
      "inline-flex items-center px-3 py-1 border rounded-md shadow-sm text-xs font-medium text-white bg-red-700",
  };

  return (
    <button
      className={`flex h-10 gap-2 justify-between ${themes[theme]} cursor-pointer`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={`flex w-full gap-2 justify-center items-center ${
          flow === "reverse" ? "flex-row-reverse" : ""
        }`}
      >
        {icon && <Icon name={icon} size={15} />}

        {title && <span>{title}</span>}
      </div>
    </button>
  );
};
