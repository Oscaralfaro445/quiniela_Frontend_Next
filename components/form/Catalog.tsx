"use client";

import { useState } from "react";
import { useModal } from "@/context/modal/ModalContext";
import {
  createForm,
  editForm,
  FieldValue,
  filterForm,
  initialValues,
} from "@/utils/catalog/catalog";
import { useGetInfoForm } from "@/hooks/queries/form/useGetInfoForm";
import { CrudAction } from "@/types/form/form";
import { useDeleteRecord } from "@/hooks/mutations/form/useDeleteRecord";
import { useCreateRecord } from "@/hooks/mutations/form/useCreateRecord";
import { useUpdateRecord } from "@/hooks/mutations/form/useUpdateRecord";
import { Table } from "@/components/shared/table/Table";
import { SectionHeader } from "./SectionHeader";
import { CatalogForm } from "./CatalogForm";
import { ModalLateral } from "../shared/modalLateral/ModalLateral";

interface Props {
  formKey: string;
}

export const Catalog = ({ formKey }: Props) => {
  console.log("FormKey received in Catalog component:", formKey);
  const { openModal, closeModal } = useModal();
  const mutation = useDeleteRecord();
  const mutationCreate = useCreateRecord();
  const mutationUpdate = useUpdateRecord();
  const { isPending, isError, data } = useGetInfoForm();
  const [isModalLAteralOpen, setIsModalLateralOpen] = useState<boolean>(false);
  const [action, setAction] = useState<CrudAction>(CrudAction.CREATE);
  const [selectedRow, setSelectedRow] = useState<{
    index: number;
    row: { [key: string]: string | number };
  } | null>(null);

  const handleSelectedRow = (
    index: number,
    row: { [key: string]: string | number },
  ) => {
    if (index === selectedRow?.index) {
      setSelectedRow(null);
      setAction(CrudAction.CREATE);
    } else {
      setSelectedRow({ index, row });
      setAction(CrudAction.UPDATE);
    }
  };

  const handleCreate = (data: Record<string, FieldValue>) => {
    mutationCreate.mutate(data);
  };

  const handleUpdate = (data: Record<string, FieldValue>) => {
    mutationUpdate.mutate(data);
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      if (selectedRow) {
        mutation.mutate(selectedRow?.row?.NUM_CLIENTE);
      }
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  if (isPending) return <div>Cargando...</div>;

  if (isError || !data) return <div>Error al cargar los datos</div>;

  const getCrudHandler =
    action === CrudAction.CREATE ? handleCreate : handleUpdate;

  const getCrudInfo =
    action === CrudAction.CREATE
      ? createForm(data?.data?.[0]?.infComponente)
      : editForm(data?.data?.[0]?.infComponente);

  const handleOpenForm = () => {
    openModal(
      <CatalogForm
        fields={getCrudInfo}
        initialValues={initialValues(
          data?.data?.[0]?.infComponente,
          selectedRow?.row,
        )}
        validateForm={true}
        handleAccept={getCrudHandler}
        handleCancel={handleCancel}
      />,
    );
  };

  return (
    <div>
      <SectionHeader
        selectedRow={selectedRow}
        setAction={setAction}
        handleOpenForm={handleOpenForm}
        handleDelete={handleDelete}
        setModalLateralOpen={setIsModalLateralOpen}
      />
      <Table selectedRow={selectedRow} handleSelectedRow={handleSelectedRow} />
      <ModalLateral
        isModalLateralOpen={isModalLAteralOpen}
        setIsModalLateralOpen={setIsModalLateralOpen}
      >
        <CatalogForm
          fields={filterForm(data?.data?.[0]?.infComponente)}
          initialValues={initialValues(
            data?.data?.[0]?.infComponente,
            selectedRow?.row,
          )}
          validateForm={false}
          handleAccept={() => {}}
          handleCancel={() => setIsModalLateralOpen(false)}
        />
      </ModalLateral>
    </div>
  );
};
