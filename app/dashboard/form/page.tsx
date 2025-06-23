"use client";

import { useState } from "react";
import useGetFormdata from "@/hooks/formdata/queries/useGetFormdata";
import { SectionHeader } from "@/components/sectionHeader/SectionHeader";
import { Button } from "@/components/shared/button/Button";
import { Table } from "@/components/shared/table/Table";
import { Modal } from "@/components/shared/modal/Modal";
import { CrudAction } from "@/models/form";

export default function Form() {
  const [action, setAction] = useState<CrudAction>(CrudAction.CREATE);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<{
    row: number | null;
    data: any;
  }>({ row: null, data: {} });
  const { isSuccess, isPending, isError, data, error } =
    useGetFormdata(); /* as {
    isSuccess: boolean;
    isPending: boolean;
    isError: boolean;
    data: any;
    error: Error;
  }; */

  // console.log(isError, isPending, isSuccess, data, error);
  /* console.log(data);
  console.log(error);
  console.log("Selected Row:", selectedRow); */

  const handleCreate = (values: any) => {
    try {
      // setIsFetching(true);
      console.log("Valores del formulario", values);
      // Se hace la llamada a la API para crear el registro
      // metadata?.infoForma.fnAcepta ? : null;
      /* setIsFetching(false);
      setModalOpen(false);
      setAlertState({
        isOpen: true,
        description: "Se creo correctamente el registro",
        title: "Completado",
        type: AlertState.SUCCESS,
      }); */
    } catch (error) {
      /* setIsFetching(false);
      setAlertState({
        isOpen: true,
        description: `Ocurrio un error al crear el registro (${error})`,
        title: "Error",
        type: AlertState.ERROR,
      }); */
    }
  };

  const handleUpdate = (values: any) => {
    try {
      //setIsFetching(true);
      // Se hace la llamada a la API para actualizar el registro
      console.log("Valores del formulario", values);

      /* setIsFetching(false);
      setModalOpen(false);
      setAlertState({
        isOpen: true,
        description: "Se actualizo el registro correctamente",
        title: "Completado",
        type: AlertState.SUCCESS,
      }); */
    } catch (error) {
      /* setIsFetching(false);
      setAlertState({
        isOpen: true,
        description: `Ocurrio un error al actualizar el registro (${error})`,
        title: "Error",
        type: AlertState.ERROR,
      }); */
    }
  };

  const getCrudHandler =
    action === CrudAction.CREATE ? handleCreate : handleUpdate;

  const handleCancel = () => {
    setSelectedRow({ row: null, data: {} });
    setModalOpen(false);
  };

  const handleSelectedRow = (row: number | null, data: any) => {
    if (row === selectedRow.row) {
      setSelectedRow({ row: null, data: {} });
      return;
    }
    setSelectedRow({ row, data });
  };

  return (
    <div className="w-full">
      {isPending && (
        <div>
          <h1>Cargando...</h1>
        </div>
      )}

      {isError && (
        <div>
          <h1>{error?.message}</h1>
        </div>
      )}

      {isSuccess && (
        <div>
          <SectionHeader>
            <SectionHeader.Details
              // title="Titulo de la forma"
              title={isSuccess ? data?.infoForma?.txTituloForma : "Cargando..."}
              description={
                isSuccess ? data?.infoForma?.descForma : "Cargando..."
              }
            />

            <SectionHeader.Buttons>
              {selectedRow.row !== null && (
                <Button
                  type="button"
                  theme="danger"
                  title="Eliminar"
                  icon="trash"
                  onClick={() => {}}
                />
              )}
              {selectedRow.row === null && (
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
              {selectedRow.row !== null && (
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

              <div className="border-l border-gray-200 h-12 ml-1 mr-2 w-1 "></div>

              <Button
                type="button"
                theme="primary"
                title="Filtros"
                icon="filter"
                // onClick={() => {}}
              />
            </SectionHeader.Buttons>
          </SectionHeader>

          <Table
            formData={data}
            selectedRow={selectedRow.row}
            handleSelectedRow={handleSelectedRow}
          />

          <Modal
            action={action}
            isModalOpen={isModalOpen}
            handleAccept={getCrudHandler}
            handleCancel={handleCancel}
            formInitialValues={selectedRow.data}
          />
        </div>
      )}
    </div>
  );
}
