"use client";

import { useState } from "react";
import { useGetInfoForm } from "@/hooks/queries/form/useGetInfoForm";
import { createForm, editForm, initialValues } from "@/utils/Catalog/catalog";
import { Table } from "@/components/shared/table/Table";
import { SectionHeader } from "./SectionHeader";
import { CatalogForm } from "./CatalogForm";
import { useModal } from "@/context/ModalContext";

enum CrudAction {
  CREATE,
  UPDATE,
}

interface Props {
  formKey: string;
}

export const Catalog = ({ formKey }: Props) => {
  console.log(formKey);

  const { openModal } = useModal();

  const { isPending, isError, data } = useGetInfoForm();
  const [action, setAction] = useState<CrudAction>(CrudAction.CREATE);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    row: { [key: string]: string | number };
  } | null>(null);

  console.log("SELECTED ROW", selectedRow);

  const handleSelectedRow = (
    index: number,
    row: { [key: string]: string | number },
  ) => {
    if (index === selectedRow?.index) {
      setSelectedRow(null);
    } else {
      setSelectedRow({ index, row });
    }
  };

  const handleCreate = () => {};

  const handleUpdate = () => {};

  const handleDelete = () => {};

  const handleCancel = () => {
    // setSelectedRow(null);
    setIsModalOpen(false);
  };

  if (isPending) return <div>Cargando...</div>;

  if (isError || !data) return <div>Error al cargar los datos</div>;

  const getCrudHandler =
    action === CrudAction.CREATE ? handleCreate : handleUpdate;

  return (
    <div>
      <SectionHeader
        selectedRow={selectedRow}
        setModalOpen={setIsModalOpen}
        setAction={setAction}
        handleDelete={handleDelete}
      />
      <button type="button" onClick={openModal}>
        Abrir Modal
      </button>
      <Table selectedRow={selectedRow} handleSelectedRow={handleSelectedRow} />
      <CatalogForm
        isModalOpen={isModalOpen}
        handleAccept={getCrudHandler}
        handleCancel={handleCancel}
        initialValues={selectedRow?.row}
        data={data?.data?.[0]?.componentes}
      />
    </div>
  );
};
