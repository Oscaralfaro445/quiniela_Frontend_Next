"use client";

import { Grid } from "@/components/grid/Grid";
import { TableHeader } from "./tableHeader/TableHeader";

export const Table = () => {
  return (
    <div className="flex flex-col px-10 bg-white rounde-md shadow-sm">
      <TableHeader />
      <Grid />
    </div>
  );
};
