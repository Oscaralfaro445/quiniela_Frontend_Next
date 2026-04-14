import { useEffect, useState } from "react";

interface GridProps {
  gridData: {
    gridColumns: string[];
    gridRows: { [key: string]: string | number }[];
  };
  selectedRow: {
    index: number;
    row: { [key: string]: string | number };
  } | null;
  handleSelectedRow: (
    index: number,
    row: { [key: string]: string | number },
  ) => void;
}

const initialState = {
  gridColumns: [] as string[],
  gridRows: [] as { [key: string]: string | number }[],
};

export const Grid = ({
  gridData,
  selectedRow,
  handleSelectedRow,
}: GridProps) => {
  const [table, setTable] = useState<{
    gridColumns: string[];
    gridRows: { [key: string]: string | number }[];
  }>(initialState);

  useEffect(() => {
    if (gridData) {
      setTable(gridData);
    } else {
      console.log("No data or gridData received in Grid component");
      setTable(initialState);
    }
  }, [gridData]);

  // console.log("Table state in Grid component:", table);

  return (
    <div className="align-middle inline-block min-w-full">
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              {table.gridColumns?.map((column) => (
                <th
                  scope="col"
                  key={`col-${column}`}
                  className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.gridRows?.map((row, index) => (
              <tr
                key={index}
                className={`hover:cursor-pointer ${selectedRow?.index === index ? "bg-blue-100" : ""}`}
                onClick={() => {
                  handleSelectedRow(index, row);
                  alert(`Registro seleccionado: ${JSON.stringify(row)}`);
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
