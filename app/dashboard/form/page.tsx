"use client";

import { SectionHeader } from "@/components/sectionHeader/SectionHeader";
import { Button } from "@/components/shared/button/Button";
import { Table } from "@/components/shared/table/Table";
import useGetFormdata from "@/hooks/formdata/queries/useGetFormdata";

export default function Form() {
  const { isSuccess, isPending, isError, data, error } =
    useGetFormdata(); /* as {
    isSuccess: boolean;
    isPending: boolean;
    isError: boolean;
    data: any;
    error: Error;
  }; */

  // console.log(isError, isPending, isSuccess, data, error);
  console.log(data);
  console.log(error);

  return (
    <div className="w-full">
      {isPending && (
        <div>
          <h1>Cargando...</h1>
        </div>
      )}

      {isError && (
        <div>
          <h1>Error</h1>
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
              {
                <Button
                  type="button"
                  theme="danger"
                  title="Eliminar"
                  icon="trash"
                  // onClick={() => {}}
                />
              }
              {
                <Button
                  type="button"
                  theme="normal"
                  title="Agregar"
                  icon="plus"
                  // onClick={() => {}}
                />
              }
              {
                <Button
                  type="button"
                  theme="primary"
                  title="Editar"
                  icon="pencil"
                  // onClick={() => {}}
                />
              }

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

          <Table formData={data} />
        </div>
      )}
    </div>
  );
}
