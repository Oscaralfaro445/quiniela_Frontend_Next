"use client";

import { useState } from "react";
import { InputType } from "@/models/input";
import { InputProps } from "@/models/input";
import { InputText } from "./inputs/InputText";
import { InputNumber } from "./inputs/InputNumber";
import { InputDate } from "./inputs/InputDate";
import { InputArea } from "./inputs/InputArea";
import { InputCheckbox } from "./inputs/InputCheckbox";
import { Icon } from "../icon/icon";
// import { InputCombo } from "./inputs/InputCombo";
import { InputEmail } from "./inputs/ImputEmail";
import { InputPassword } from "./inputs/InputPassword";
// import "./Input.css";

export const Input = ({
  field,
  type,
  label,
  description,
  placeholder,
  name,
  id,
  value,
  disabled,
  required,
  onChange,
  onBlur,
}: InputProps) => {
  const inputType = field ? field.cveTipoCompon : type;
  const [showHelp, setShowHelp] = useState(false);
  // console.log("InputType", inputType);

  const handleShow = () => {
    setShowHelp(!showHelp);
  };

  const renderInput = () => {
    if (!inputType) return null;

    const commonProps = {
      placeholder,
      name,
      id,
      value,
      disabled,
      required,
      onChange,
      onBlur,
    };

    // console.log("Input type:", inputType);
    switch (inputType) {
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
    <div className="flex w-full relative">
      {field ? (
        <>
          {field.cveTipoCompon !== InputType.RELATION && (
            <div className="flex flex-col gap-2 w-full items-start">
              <label
                htmlFor={name}
                className="block text-start text-sm font-medium text-gray-600"
              >
                {field.txEtiqueta}
              </label>

              <div className="flex gap-2">
                {renderInput()}
                {field.txAyuda && (
                  <div
                    className="flex"
                    onMouseEnter={() => handleShow}
                    onMouseLeave={() => handleShow}
                  >
                    <Icon name="message-circle-question-mark" />
                    {showHelp && (
                      <p className="absolute left-full top-1/2 ml-2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg z-10 w-44">
                        {field.txAyuda}
                        {console.log("Ayuda", field.txAyuda)}
                        {console.log("ShowHelp", showHelp)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-2 w-full items-center justify-start">
          <label
            htmlFor={name}
            className="w-full text-start text-sm font-medium text-gray-600"
          >
            {label}
          </label>

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
      )}
    </div>
  );
};
