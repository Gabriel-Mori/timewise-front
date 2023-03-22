import React from "react";
import Pagination from "react-js-pagination";

interface Props {
  activePage: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed?: number;
  onChangePage(page: number): void;
}

const ListPagination: React.FC<Props> = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed = 5,
  onChangePage,
}) => {
  if (!totalItemsCount) {
    return null;
  }
  return (
    <div className="flex items-center justify-center">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        onChange={onChangePage}
      />
    </div>
  );
};

export default ListPagination;
