import { Icon } from "../icon/Icon";

interface PaginatorProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
}

export const Paginator = ({
  currentPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}: PaginatorProps) => {
  const goToFirstPage = () => {
    if (currentPage > 1) onPageChange(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < 100) onPageChange(currentPage + 1);
  };

  const goToLastPage = () => {
    if (currentPage < 100) onPageChange(100);
  };

  return (
    <div className="flex px-2 gap-2 items-center justify-end">
      <div className="flex gap-1 items-center">
        <p>Filas</p>
        <select
          name="rowsPerPage"
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(event) => {
            onRowsPerPageChange(Number(event.target.value));
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center">
        <div className="cursor-pointer" onClick={goToFirstPage}>
          <Icon name="chevrons-left" />
        </div>

        <div className="cursor-pointer" onClick={goToPreviousPage}>
          <Icon name="chevron-left" />
        </div>

        <p className="flex justify-center w-20">{currentPage} - 100</p>

        <div className="cursor-pointer" onClick={goToNextPage}>
          <Icon name="chevron-right" />
        </div>

        <div className="cursor-pointer" onClick={goToLastPage}>
          <Icon name="chevrons-right" />
        </div>
      </div>
    </div>
  );
};
