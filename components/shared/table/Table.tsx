"use client";

import { useState } from "react";
import { Grid } from "@/components/grid/Grid";
import { TableHeader } from "./tableHeader/TableHeader";
import { Paginator } from "../paginator/paginator";

interface TableProps {
  formData?: any;
  gridData?: any;
  selectedRow: number | null;
  handleSelectedRow: (row: number | null, data: any) => void;
}

export const Table = ({
  formData,
  gridData,
  selectedRow,
  handleSelectedRow,
}: TableProps) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log("rowsPerPage:", rowsPerPage);

  return (
    <div className="flex flex-col py-4 px-6 gap-2">
      <TableHeader />

      <Grid
        formData={formData}
        gridData={gridData}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        selectedRow={selectedRow}
        handleSelectedRow={handleSelectedRow}
      />

      {gridData && (
        <Paginator
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
        />
      )}
    </div>
  );
};
