"use client";

import { useGetInfoForm } from "@/hooks/queries/form/useGetInfoForm";
import { TableHeader } from "./TableHeader";
import { Grid } from "../grid/Grid";
import { useGetDataGrid } from "@/hooks/queries/grid/useGetDataGrid";

interface Props {
  selectedRow: {
    index: number;
    row: { [key: string]: string | number };
  } | null;
  handleSelectedRow: (
    index: number,
    row: { [key: string]: string | number },
  ) => void;
}

export const Table = ({ selectedRow, handleSelectedRow }: Props) => {
  const { data } = useGetInfoForm();
  const { data: gridData } = useGetDataGrid();

  const gridHeaders = data?.data?.[0]?.infComponente
    ?.filter((component) => component?.bGrid)
    ?.map((row) => ({
      [row?.nomCampoBd]: row?.txEtiqueta,
    }));

  if (!data) return <div>Cargando...</div>;

  console.log(gridData);

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
    </div>
  );
};
