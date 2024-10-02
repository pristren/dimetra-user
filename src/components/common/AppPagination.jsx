import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AppPagination = ({ queryData, setQueryData, totalPage }) => {
  const currentPage = queryData?.page;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPage) return;
    setQueryData((prev) => ({
      ...prev,
      page,
    }));
  };

  const renderPaginationItems = () => {
    const items = [];

    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        items.push(
          <PaginationItem
            key={i}
            className={
              currentPage === i ? "active rounded-md" : "cursor-pointer"
            }
          >
            <PaginationLink
              className={
                currentPage === i
                  ? " bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
              }
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem
          key={1}
          className={currentPage === 1 ? "active rounded-md" : "cursor-pointer"}
        >
          <PaginationLink
            className={
              currentPage === 1
                ? " bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                : "hover:bg-secondary hover:text-secondary-foreground"
            }
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPage - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem
            key={i}
            className={
              currentPage === i ? "active rounded-md" : "cursor-pointer"
            }
          >
            <PaginationLink
              className={
                currentPage === i
                  ? " bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
              }
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPage - 2) {
        items.push(<PaginationEllipsis key="end-ellipsis" />);
      }

      items.push(
        <PaginationItem
          key={totalPage}
          //   className={currentPage === totalPage ? "active" : ""}
          className={
            currentPage === totalPage ? "active rounded-md" : "cursor-pointer"
          }
        >
          <PaginationLink
            className={
              currentPage === totalPage
                ? " bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                : "hover:bg-secondary hover:text-secondary-foreground"
            }
            onClick={() => handlePageChange(totalPage)}
          >
            {totalPage}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <>
      {totalPage ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${
                  currentPage === 1 ? "opacity-40 pointer-events-none" : ""
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  currentPage === totalPage
                    ? "opacity-40 pointer-events-none"
                    : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </>
  );
};

export default AppPagination;
