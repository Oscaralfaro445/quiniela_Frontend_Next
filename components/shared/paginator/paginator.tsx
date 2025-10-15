import { Icon } from "../icon/Icon";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Paginator = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginatorProps) => {
  const goToFirstPage = () => {
    if (currentPage > 1) onPageChange(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 3) onPageChange(currentPage + 1);
  };

  const goToLastPage = () => {
    if (currentPage < totalPages) onPageChange(totalPages - 3);
  };

  return (
    <div className="flex px-2 gap-2 items-center justify-end">
      <div className="flex items-center">
        <div className="cursor-pointer" onClick={goToFirstPage}>
          <Icon name="chevrons-left" />
        </div>

        <div className="cursor-pointer" onClick={goToPreviousPage}>
          <Icon name="chevron-left" />
        </div>

        <p className="flex justify-center w-20">{`${currentPage} - ${totalPages}`}</p>

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
