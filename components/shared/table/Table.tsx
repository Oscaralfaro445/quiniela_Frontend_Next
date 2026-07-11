"use client";

import { useGetInfoForm } from "@/hooks/queries/form/useGetInfoForm";
import { TableHeader } from "./TableHeader";
import { Grid } from "../grid/Grid";
import { useGetDataGrid } from "@/hooks/queries/grid/useGetDataGrid";
import { Paginator } from "../paginator/paginator";
import { useState } from "react";

interface Props {
  selectedRow: {
    index: number;
    row: { [key: string]: string | number | boolean };
  } | null;
  handleSelectedRow: (
    index: number,
    row: { [key: string]: string | number | boolean },
  ) => void;
}

export const Table = ({ selectedRow, handleSelectedRow }: Props) => {
  const { data } = useGetInfoForm();
  const { data: gridData } = useGetDataGrid();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const gridHeaders = data?.data?.[0]?.infComponente
    ?.filter((component) => component?.bGrid)
    ?.map((row) => ({
      [row?.nomCampoBd]: row?.txEtiqueta,
    }));

  if (!data) return <div>Cargando...</div>;

  return (
    <div className="grid py-4 gap-2">
      <TableHeader />
      <Grid
        gridData={{
          gridColumns: gridHeaders ?? [],
          gridRows: gridData?.data ?? [],
        }}
        selectedRow={selectedRow}
        handleSelectedRow={handleSelectedRow}
      />
      <Paginator
        currentPage={currentPage}
        totalPages={100}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
