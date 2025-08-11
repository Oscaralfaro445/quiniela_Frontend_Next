"use client";

import { useState } from "react";
import { InputType } from "@/types/input/input";
import { InputProps } from "@/types/input/input";
import { InputText } from "./inputs/InputText";
import { InputNumber } from "./inputs/InputNumber";
import { InputDate } from "./inputs/InputDate";
import { InputArea } from "./inputs/InputArea";
import { InputCheckbox } from "./inputs/InputCheckbox";
import { Icon } from "../icon/Icon";
// import { InputCombo } from "./inputs/InputCombo";
import { InputEmail } from "./inputs/ImputEmail";
import { InputPassword } from "./inputs/InputPassword";

export const Input = ({
  type,
  name,
  label,
  placeholder,
  description,
  disabled,
}: InputProps) => {
  const [showHelp, setShowHelp] = useState(false);

  const handleShow = () => {
    setShowHelp(!showHelp);
  };

  const renderInput = () => {
    if (!type) return null;

    const commonProps = {
      type,
      name,
      label,
      placeholder,
      description,
      disabled,
    };

    switch (type) {
      case InputType.AREA:
      case "area":
        return <InputArea {...commonProps} />;

      /* case InputType.COMBO:
      case "combo":
        return <InputCombo {...commonProps} />; */

      case InputType.FECHA:
      case "date":
        return <InputDate {...commonProps} />;

      case "email":
        return <InputEmail {...commonProps} />;

      case InputType.NUMERO:
      case "number":
        return <InputNumber {...commonProps} />;

      case "password":
        return <InputPassword {...commonProps} />;

      case InputType.SWITCH:
      case "checkbox":
        return <InputCheckbox {...commonProps} />;

      case InputType.TEXTO:
      case "text":
        return <InputText {...commonProps} />;
    }
  };

  return (
    <div className="relative flex flex-col w-full gap-2 items-center justify-start">
      {label && (
        <label
          className="w-full text-start text-sm font-medium text-gray-600"
          htmlFor={name}
        >
          {label}
        </label>
      )}

      {renderInput()}

      {description && (
        <div
          className="flex"
          onMouseEnter={handleShow}
          onMouseLeave={handleShow}
        >
          <Icon name="message-circle-question-mark" />
          {showHelp && (
            <p className="absolute left-full top-1/2 ml-2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg z-10 w-44">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
