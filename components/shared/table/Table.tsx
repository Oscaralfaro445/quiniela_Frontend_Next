"use client";

import { useState } from "react";
import { Grid } from "@/components/grid/Grid";
import { TableHeader } from "./tableHeader/TableHeader";
import { Paginator } from "../paginator/paginator";

export const Table = ({
  formData,
  gridData,
}: {
  formData?: any;
  gridData?: any;
}) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log("rowsPerPage:", rowsPerPage);

  return (
    <div className="flex flex-col py-4 px-6 gap-2 bg-white rounde-md shadow-sm">
      <TableHeader />
      <Grid
        formData={formData}
        gridData={gridData}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
      />
      <Paginator
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};
