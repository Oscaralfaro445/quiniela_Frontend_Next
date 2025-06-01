import { useState } from "react";
import { InputType } from "@/Models/input";
import { InputProps } from "@/Models/input";
import { InputText } from "./inputs/InputText";
import { InputNumber } from "./inputs/InputNumber";
import { InputDate } from "./inputs/InputDate";
import { InputArea } from "./inputs/InputArea";
import { InputSwitch } from "./inputs/InputSwitch";
import { Icon } from "../icon/icon";
import { InputCombo } from "./inputs/InputCombo";
// import "./Input.css";

export const Input = ({
  field,
  type,
  label,
  description,
  placeholder,
  name,
  value,
  id,
  disabled,
  required,
  onChange,
}: InputProps) => {
  const inputType = field ? field.cveTipoCompon : type;
  console.log(inputType);
  const [showHelp, setShowHelp] = useState(false);

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
    };

    switch (type) {
      case InputType.TEXTO:
      case "text":
        return <InputText {...commonProps} />;
      case InputType.NUMERO:
      case "number":
        return <InputNumber {...commonProps} />;
      case InputType.FECHA:
      case "date":
        return <InputDate {...commonProps} />;
      case InputType.AREA:
      case "area":
        return <InputArea {...commonProps} />;
      case InputType.SWITCH:
      case "switch":
        return <InputSwitch {...commonProps} />;
      case InputType.COMBO:
      case "combo":
        return <InputCombo {...commonProps} />;
    }
  };

  return (
    <div className="col-span-12 relative">
      {field ? (
        <>
          {field.cveTipoCompon !== InputType.RELATION && (
            <div className="flex items-center">
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-600 mr-4"
              >
                {field.txEtiqueta}
              </label>
              {field.txAyuda && (
                <div
                  className="flex-col"
                  onMouseEnter={() => handleShow}
                  onMouseLeave={() => handleShow}
                >
                  <Icon iconName="questionMark" />
                  {showHelp && (
                    <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg z-10 w-44">
                      {field.txAyuda}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {renderInput()}
        </>
      ) : (
        <div className="flex items-center">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-600 mr-4"
          >
            {label}
          </label>
          {description && (
            <div
              className="flex-col"
              onMouseEnter={handleShow}
              onMouseLeave={handleShow}
            >
              <Icon iconName="questionMark" />
              {showHelp && (
                <p className="absolute left-full top-1/2 ml-2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 shadow-lg z-10 w-44">
                  {description}
                </p>
              )}
            </div>
          )}
          {renderInput()}
        </div>
      )}
    </div>
  );
};
