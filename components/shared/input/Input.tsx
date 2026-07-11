"use client";

import { InputType } from "@/types/input/input";
import { InputV2Props } from "@/types/input/input";
import { InputBasic } from "./inputs/InputBasic";
import { useField } from "formik";
import { InputPassword } from "./inputs/InputPassword";
import { InputArea } from "./inputs/InputArea";
import { InputCombo } from "./inputs/InputCombo";
import { InputSwitch } from "./inputs/InputSwitch";
import { InputSeparator } from "./inputs/InputSeparator";

export const Input = ({
  id,
  name,
  type,
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
        return <InputBasic type={"text"} {...commonProps} />;

      case InputType.FECHA:
      case "date":
        return <InputBasic type={"date"} {...commonProps} />;

      case InputType.NUMERO:
      case "number":
        return <InputBasic type={"number"} {...commonProps} />;

      case "email":
        return <InputBasic type={"email"} {...commonProps} />;

      case InputType.AREA:
      case "area":
        return <InputArea {...commonProps} />;

      case InputType.SWITCH:
      case "switch":
        return (
          <InputSwitch
            id={id}
            name={name}
            value={field.value}
            label={label}
            onChange={field.onChange}
          />
        );

      case InputType.COMBO:
      case "combo":
        return (
          <InputCombo
            id={id}
            name={name}
            selected={field.value}
            label={label}
            data={
              JSON.parse(
                '{"infComp":{"nomComponente":"tipoCliente","nomCampoValor":"cveTipoCte","nomCampoEtiqueta":"tipoCliente"},"infValida":null,"infData":[{"llave":"ADMON","valor":"ADMINISTRADOR"},{"llave":"PARTICIPANTE","valor":"PARTICIPANTE"},{"llave":"SISTEMAS","valor":"SISTEMAS"},{"llave":"TEMPORAL","valor":"TEMPORAL"}]}',
              ).infData
            }
            onChange={field.onChange}
          />
        );

      case "password":
        return <InputPassword type={type} {...commonProps} />;

      case InputType.SEPARADOR:
        return <InputSeparator />;
    }
  };

  return (
    <div className="relative flex w-full gap-2 items-center justify-start">
      {renderInput()}
    </div>
  );
};
