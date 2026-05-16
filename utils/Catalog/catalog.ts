import * as Yup from "yup";
import { Component } from "@/types/form/infoForm";

export type FieldValue = string | number | boolean | null;

const defaultByTypes: Record<string, FieldValue> = {
  NUMERO: 0,
  TEXTO: "",
  COMBO: "",
  FECHA: null,
  AREA: "",
  SWITCH: false,
};

export const initialValues = (
  data: Component[] | undefined,
  values?: { [key: string]: string | number } | undefined,
): Record<string, FieldValue> => {
  const initialValues = data?.reduce<Record<string, FieldValue>>(
    (acc, component) => {
      const key = component?.nomCampoBd ?? component?.nomComponente;
      const type = component?.cveTipoCompon ?? "string";

      acc[key] = defaultByTypes[type] ?? "";

      return acc;
    },
    {},
  );

  return { ...initialValues, ...(values || {}) };
};

export const editForm = (data: Component[] | undefined) =>
  data?.filter(
    (component) => component.cveTipoCompon === "SEPARADOR" || component.bEdita,
  );

export const createForm = (data: Component[] | undefined) =>
  data?.filter(
    (component) => component.cveTipoCompon === "SEPARADOR" || component.bCrea,
  );

export const filterForm = (data: Component[] | undefined) =>
  data?.filter(
    (component) => component.cveTipoCompon === "SEPARADOR" || component.bFiltra,
  );

const operators = [">", "<", "="];

function parseValidationFunction(fnValida: string) {
  for (const operator of operators) {
    const parts = fnValida.split(operator);
    if (parts.length === 2) {
      return {
        leftField: parts[0].trim(),
        operator,
        rightField: parts[1].trim(),
      };
    }
  }
  return null;
}

function applyCrossValidation(yupField, fnValida: string, msgValida: string) {
  const parsedFn = parseValidationFunction(fnValida);
  if (!parsedFn) return yupField;

  const { leftField, operator, rightField } = parsedFn;
  console.log(operator);
  console.log(leftField, rightField);

  return yupField.test("cross validation", msgValida, function (value) {
    const leftValue = this.parent[leftField];
    const rightValue = this.parent[rightField];

    if (leftValue === null || rightValue === null) return true;

    console.log(
      "Left value:",
      leftValue,
      "Operator:",
      operator,
      "Right value:",
      rightValue,
    );

    switch (operator) {
      case ">":
        return leftValue > rightValue;
      case "<":
        return leftValue < rightValue;
      case "=":
        return leftValue === rightValue;
      default:
        return true;
    }
  });
}

export function generateValidationSchema(fields: Component[]) {
  const shape: Record<string, any> = {};
  const filteredFields = fields.filter(
    (field) => field.cveTipoCompon !== "SEPARADOR",
  );

  for (const field of filteredFields) {
    const {
      cveTipoCampo,
      bRequerido,
      nomCampoBd,
      nomComponente,
      infdetComp,
      fnValida,
      msgValida,
      txEtiqueta,
    } = field;

    const validationRules = infdetComp
      ? JSON.parse(JSON.parse(infdetComp).infValida)
      : null;

    console.log(validationRules);
    console.log(
      "Validation rules for field",
      field.nomComponente,
      ":",
      validationRules,
    );

    let yupField;

    switch (cveTipoCampo) {
      case "string":
        yupField = Yup.string();
        break;
      case "number":
        yupField = Yup.number();
        break;
      case "date":
        yupField = Yup.date();
        break;
      case "bit":
        yupField = Yup.boolean();
        break;
    }

    if (bRequerido) {
      yupField = yupField?.required(`${txEtiqueta} es requerido`);
    }

    if (fnValida && msgValida) {
      yupField = applyCrossValidation(yupField, fnValida, msgValida);
    }

    const key = nomCampoBd ?? nomComponente;
    shape[key] = yupField;
  }

  return Yup.object().shape(shape);
}
