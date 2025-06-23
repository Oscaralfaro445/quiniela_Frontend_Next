import useGetGridData from "@/hooks/gridData/queries/useGetGridData";
import { useEffect, useState } from "react";

interface GridProps {
  formData?: any;
  gridData?: any;
  rowsPerPage: number;
  currentPage: number;
  selectedRow: number | null;
  handleSelectedRow: (row: number | null, data: any) => void;
}

const initialState = {
  rows: [],
  columns: [],
  isSuccess: false,
  isPending: false,
  isError: false,
};

export const Grid = ({
  formData,
  gridData,
  rowsPerPage,
  currentPage,
  selectedRow,
  handleSelectedRow,
}: GridProps) => {
  const [table, setTable] = useState(initialState);
  const { isSuccess, isPending, isError, data } = useGetGridData(
    rowsPerPage,
    currentPage
  );
  // console.log("Grid component data:", data);

  const setTableData = () => {
    if (formData) {
      // console.log("Data received in Grid component:", data);

      const columns = (formData: any) => {
        return formData.infComponente
          .filter((field: any) => field.bGrid)
          .map((field: any) => field.txEtiqueta);
      };

      // console.log("Columns derived from formData:", columns(formData));

      setTable({
        columns: columns(formData),
        rows: data,
        isSuccess: isSuccess,
        isPending: isPending,
        isError: isError,
      });
    } else if (gridData) {
      // console.log("GridData received in Grid component:", gridData);
      setTable({
        columns: gridData.columns,
        rows: gridData.rows,
        isSuccess: true,
        isPending: false,
        isError: false,
      });
    } else {
      // console.log("No data or gridData received in Grid component");
      setTable(initialState);
    }
  };

  useEffect(() => {
    setTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isPending, isSuccess, data]);

  console.log("Table state in Grid component:", table);

  return (
    <div className="p-4 align-middle inline-block min-w-full">
      <div className="overflow-x-auto sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {table.columns?.map((column) => (
                <th
                  scope="col"
                  key={`col-${column}`}
                  className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.rows?.map((row, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${
                  selectedRow === index ? "bg-indigo-50 text-white" : ""
                } `}
                onClick={() => {
                  handleSelectedRow(index, row);
                }}
              >
                {Object.values(row).map((value, i) => (
                  <td key={i} className="px-6 py-3 text-center">
                    <div className="text-xs text-gray-500">{String(value)}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
