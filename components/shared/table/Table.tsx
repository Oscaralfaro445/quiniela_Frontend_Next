"use client";

import { useGetInfoForm } from "@/hooks/queries/form/useGetInfoForm";
import { TableHeader } from "./TableHeader";
import { Grid } from "../grid/Grid";

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

  const gridData = [
    {
      idEmpleado: 31,
      nombre_cliente: "Raúl Rojas",
      tipoCliente: "B",
      impSueldo: 30470.99,
    },
    {
      idEmpleado: 32,
      nombre_cliente: "Luis Cruz",
      tipoCliente: "B",
      impSueldo: 45348.02,
    },
    {
      idEmpleado: 33,
      nombre_cliente: "Elena Vargas",
      tipoCliente: "C",
      impSueldo: 55902.83,
    },
    {
      idEmpleado: 34,
      nombre_cliente: "Silvia Núñez",
      tipoCliente: "C",
      impSueldo: 61978.91,
    },
    {
      idEmpleado: 35,
      nombre_cliente: "Luis Pérez",
      tipoCliente: "C",
      impSueldo: 32436.82,
    },
    {
      idEmpleado: 36,
      nombre_cliente: "Luis Salazar",
      tipoCliente: "A",
      impSueldo: 78517.65,
    },
    {
      idEmpleado: 37,
      nombre_cliente: "Silvia Díaz",
      tipoCliente: "B",
      impSueldo: 30823.95,
    },
    {
      idEmpleado: 38,
      nombre_cliente: "José Sánchez",
      tipoCliente: "A",
      impSueldo: 26958.87,
    },
    {
      idEmpleado: 39,
      nombre_cliente: "Raúl Campos",
      tipoCliente: "A",
      impSueldo: 71708.97,
    },
    {
      idEmpleado: 40,
      nombre_cliente: "Elena Rojas",
      tipoCliente: "A",
      impSueldo: 68610.58,
    },
  ];

  console.log(data);

  const gridHeaders =
    data?.data?.[0]?.componentes
      ?.filter((componet) => componet?.B_GRID)
      ?.map((row) => row?.TX_ETIQUETA || "") || [];

  console.log("gridHeaders", gridHeaders);

  // console.log("dataGrid", data?.data?.[0]?.componentes);

  if (!data) return <div>Cargando...</div>;

  return (
    <div className="grid py-4 gap-2">
      <TableHeader />
      <Grid
        gridData={{ gridColumns: gridHeaders, gridRows: gridData }}
        selectedRow={selectedRow}
        handleSelectedRow={handleSelectedRow}
      />
    </div>
  );
};
