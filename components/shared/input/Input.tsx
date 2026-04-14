"use client";

import { InputType } from "@/types/input/input";
import { InputV2Props } from "@/types/input/input";
import { InputV2 } from "./inputs/InputV2";
import { useField } from "formik";
import { InputPasswordV2 } from "./inputs/InputPasswordV2";
import { InputArea } from "./inputs/InputArea";
import { InputCombo } from "./inputs/InputCombo";
import { InputSwitch } from "./inputs/InputSwitch";

export const Input = ({
  id,
  type,
  name,
  label,
  placeholder,
  disabled,
}: InputV2Props) => {
  const [field, meta] = useField(name);

  const renderInput = () => {
    if (!type) return null;

    const commonProps = {
      id,
      label,
      placeholder,
      disabled,
      ...field,
      hasError: meta.touched && meta.error ? true : false,
      error: meta.touched && meta.error ? meta.error : null,
    };

    switch (type) {
      case InputType.TEXTO:
      case "text":
        return <InputV2 type={"text"} {...commonProps} />;

      case InputType.FECHA:
      case "date":
        return <InputV2 type={"date"} {...commonProps} />;

      case InputType.NUMERO:
      case "number":
        return <InputV2 type={"number"} {...commonProps} />;

      case "email":

      case InputType.AREA:
      case "area":
        return <InputArea {...commonProps} />;

      case InputType.SWITCH:
      case "switch":
        return <InputSwitch />;

      case InputType.COMBO:
      case "combo":
        return <InputCombo data={[]} />;

      case "password":
        return <InputPasswordV2 type={type} {...commonProps} />;
    }
  };

  return (
    <div className="relative flex flex-col w-full gap-2 items-center justify-start">
      {renderInput()}
    </div>
  );
};
