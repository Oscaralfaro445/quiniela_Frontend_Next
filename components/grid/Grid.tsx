import { useEffect, useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import { fetchGridData } from "../../Utils/grid";

interface GridProps {
  config: {
    columnHeaders?: any[];
    endpoint?: string;
  };
  query: any;
  currentPage: number;
  selectedRow: number | null;
  handleSelectedRow: (row: number | null, data: any) => void;
  externalLoading: boolean;
}

type TableType = {
  rows: any[];
  columns: [];
  loading: boolean;
  error: null | string;
};

const initialState = {
  rows: [],
  columns: [],
  loading: false,
  error: null,
};

export const Grid = ({
  config,
  query,
  currentPage,
  selectedRow,
  handleSelectedRow,
  externalLoading,
}: GridProps) => {
  const [table, setTable] = useState<TableType>(initialState);

  const setTableData = async () => {
    let rows: any = [];
    let columns: any = [];

    setTable({
      rows,
      columns,
      error: null,
      loading: true,
    });

    if (!config.columnHeaders?.length || !config.endpoint) {
      setTable({
        ...table,
        error: "No hay información para construir la tabla",
      });
      return;
    }

    columns = config.columnHeaders;
    rows = await fetchGridData(config.endpoint, currentPage, query);
    setTable({ rows, columns, loading: false, error: null });
  };

  useEffect(() => {
    setTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, config, externalLoading, query]);

  if (table.loading || externalLoading)
    return (
      <div className="w-full h-52 my-4 flex justify-center items-center">
        {" "}
        <Spinner size="md" />
      </div>
    );

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
