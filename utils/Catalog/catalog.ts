import { Componente } from "@/hooks/queries/form/useGetInfoForm";

export const initialValues = (
  data: Componente[] | undefined,
  values?: Componente[] | undefined,
) => {
  const initialValues = data?.reduce<{ [key: string]: string }>(
    (acc, componente) => {
      acc[componente.NOM_COMPONENTE] = "";
      return acc;
    },
    {},
  );
  return { ...initialValues, ...(values || {}) };
};
export const editForm = (data: Componente[] | undefined) =>
  data?.filter((componente: Componente) => componente.B_EDITA);

export const createForm = (data: Componente[] | undefined) =>
  data?.filter((componente: Componente) => componente.B_CREA);
