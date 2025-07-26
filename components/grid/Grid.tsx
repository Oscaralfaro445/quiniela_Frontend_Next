import { useEffect, useState } from "react";

interface GridProps {
  gridData: { [key: string]: string | number }[];
}

const initialState = {
  columns: [] as string[],
  rows: [] as { [key: string]: string | number }[],
};

export const Grid = ({ gridData }: GridProps) => {
  const [table, setTable] = useState(initialState);

  useEffect(() => {
    if (gridData && gridData.length > 0) {
      setTable({
        columns: Object.keys(gridData[0]),
        rows: gridData,
      });
    } else {
      console.log("No data or gridData received in Grid component");
      setTable(initialState);
    }
  }, [gridData]);

  // console.log("Table state in Grid component:", table);

  return (
    <div className="p-4 align-middle inline-block min-w-full">
      <div className="overflow-x-auto sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              {table.columns?.map((column) => (
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
            {table.rows?.map((row, index) => (
              <tr
                key={index}
                /* className={`cursor-pointer ${
                  selectedRow === index ? "bg-indigo-50 text-white" : ""
                } `}
                onClick={() => {
                  handleSelectedRow(index, row);
                }} */
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
