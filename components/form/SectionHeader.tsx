"use client";

import { useGetInfoForm } from "@/hooks/queries/form/useGetInfoForm";
import { Button } from "../shared/button/Button";

enum CrudAction {
  CREATE,
  UPDATE,
}

interface Props {
  selectedRow: {
    index: number;
    row: { [key: string]: string | number };
  } | null;
  setModalOpen: (isOpen: boolean) => void;
  setAction: (action: CrudAction) => void;
  handleDelete?: () => void;
}

export const SectionHeader = ({
  selectedRow,
  setModalOpen,
  setAction,
  handleDelete,
}: Props) => {
  const { data } = useGetInfoForm();
  const formInfo = data?.data?.[0];

  return (
    <div className="flex px-4 w-full h-20 justify-between items-center bg-white shadow-sm rounded-md">
      <div className="flex flex-col">
        <p className="font-semibold text-xl text-neutral-600">
          {formInfo?.TX_TITULO_FORMA ?? "Título del formulario"}
        </p>
        <p className="font-normal text-sm text-neutral-500">
          {formInfo?.DESC_FORMA ?? "Descripción del formulario"}
        </p>
      </div>

      <div className="flex gap-2 items-center">
        {formInfo?.B_BORRA && selectedRow && (
          <Button
            type="button"
            theme="danger"
            title="Eliminar"
            icon="trash-2"
            onClick={handleDelete}
          />
        )}

        {formInfo?.B_CREA && !selectedRow && (
          <Button
            type="button"
            theme="normal"
            title="Agregar"
            icon="plus"
            onClick={() => {
              setAction(CrudAction.CREATE);
              setModalOpen(true);
            }}
          />
        )}

        {formInfo?.B_EDITA && selectedRow && (
          <Button
            type="button"
            theme="primary"
            title="Editar"
            icon="pencil"
            onClick={() => {
              setAction(CrudAction.UPDATE);
              setModalOpen(true);
            }}
          />
        )}

        {formInfo?.B_FILTRA && (
          <>
            <div className="border-l border-gray-400 h-12 ml-4 mr-4" />

            <Button
              type="button"
              theme="primary"
              title="Filtros"
              icon="filter"
              onClick={() => {}}
            />
          </>
        )}
      </div>
    </div>
  );
};
