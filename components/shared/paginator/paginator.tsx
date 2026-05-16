import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

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
    <div className="flex px-2 py-4 gap-2 items-center justify-end">
      <div className="flex items-center">
        <div onClick={goToFirstPage} className="cursor-pointer">
          <ChevronsLeft className="text-blue-600 hover:text-blue-700" />
        </div>

        <div onClick={goToPreviousPage} className="cursor-pointer">
          <ChevronLeft className="text-blue-600 hover:text-blue-700" />
        </div>

        <p className="flex px-2 justify-center">{`${currentPage} - ${totalPages}`}</p>

        <div onClick={goToNextPage} className="cursor-pointer">
          <ChevronRight className="text-blue-600 hover:text-blue-700" />
        </div>

        <div onClick={goToLastPage} className="cursor-pointer">
          <ChevronsRight className="text-blue-600 hover:text-blue-700" />
        </div>
      </div>
    </div>
  );
};
