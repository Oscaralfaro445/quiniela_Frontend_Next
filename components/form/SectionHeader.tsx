"use client";

import { useGetInfoForm } from "@/hooks/queries/form/useGetInfoForm";
import { CrudAction } from "@/types/form/form";
import { Button } from "../shared/button/Button";

interface Props {
  selectedRow: {
    index: number;
    row: { [key: string]: string | number | boolean };
  } | null;
  setAction: (action: CrudAction) => void;
  handleOpenForm: () => void;
  handleDelete?: () => void;
  setModalLateralOpen: (state: boolean) => void;
}

export const SectionHeader = ({
  selectedRow,
  handleOpenForm,
  handleDelete,
  setModalLateralOpen,
}: Props) => {
  const { data } = useGetInfoForm();
  const formInfo = data?.data?.[0].infoForma;

  return (
    <div className="flex px-4 w-full h-20 justify-between items-center bg-white shadow-sm rounded-md">
      <div className="flex flex-col">
        <p className="font-semibold text-xl text-neutral-600">
          {formInfo?.txTituloForma ?? "Título del formulario"}
        </p>
        <p className="font-normal text-sm text-neutral-500">
          {formInfo?.descForma ?? "Descripción del formulario"}
        </p>
      </div>

      <div className="flex gap-2 items-center">
        {formInfo?.bBorra && selectedRow && (
          <Button
            type="button"
            theme="danger"
            title="Eliminar"
            icon="trash-2"
            onClick={handleDelete}
          />
        )}

        {formInfo?.bCrea && !selectedRow && (
          <Button
            type="button"
            theme="normal"
            title="Agregar"
            icon="plus"
            onClick={handleOpenForm}
          />
        )}

        {formInfo?.bEdita && selectedRow && (
          <Button
            type="button"
            theme="primary"
            title="Editar"
            icon="pencil"
            onClick={handleOpenForm}
          />
        )}

        {formInfo?.fFiltra && (
          <>
            <div className="border-l border-gray-400 h-12 ml-4 mr-4" />

            <Button
              type="button"
              theme="primary"
              title="Filtros"
              icon="filter"
              onClick={() => setModalLateralOpen(true)}
            />
          </>
        )}
      </div>
    </div>
  );
};
