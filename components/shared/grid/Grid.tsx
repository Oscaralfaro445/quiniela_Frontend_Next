import { useEffect, useState } from "react";

interface GridProps {
  gridData: {
    gridColumns: { [key: string]: string }[];
    gridRows: { [key: string]: string | number | boolean }[];
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
  gridColumns: [] as { [key: string]: string }[],
  gridRows: [] as { [key: string]: string | number }[],
};

export const Grid = ({
  gridData,
  selectedRow,
  handleSelectedRow,
}: GridProps) => {
  const [table, setTable] = useState<{
    gridColumns: { [key: string]: string }[];
    gridRows: { [key: string]: string | number }[];
  }>(initialState);

  useEffect(() => {
    if (gridData) {
      setTable(gridData);
    } else {
      setTable(initialState);
    }
  }, [gridData]);

  return (
    <div className="align-middle inline-block min-w-full">
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              {table.gridColumns?.map((column, index) => {
                const key = Object.keys(column)[0];
                const value = Object.values(column)[0];
                return (
                  <th
                    scope="col"
                    key={index}
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                  >
                    {value}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.gridRows?.map((row, index) => (
              <tr
                key={index}
                className={`hover:cursor-pointer ${selectedRow?.index === index ? "bg-blue-100" : ""}`}
                onClick={() => {
                  handleSelectedRow(index, row);
                }}
              >
                {table.gridColumns?.map((column, colIndex) => {
                  const key = Object.keys(column)[0];

                  return (
                    <td key={`${colIndex}`} className="px-6 py-3 text-center">
                      <div className="text-xs text-gray-500">
                        {String(row[key])}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
