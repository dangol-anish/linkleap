import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <footer className="border-t-[1px] border-linkleap-border h-[64px]  bottom-0 w-full px-[24px] text-[14px] pt-[12px] py-[12px] flex justify-between items-center ">
      <ul className="flex gap-[12px]">
        <li className="flex items-center">
          <button
            className="border-[1px] font-medium border-linkleap-border rounded-[8px] px-[14px] py-[8px] flex items-center"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        <li className="flex items-center">
          <button
            className="border-[1px] font-medium border-linkleap-border rounded-[8px] px-[14px] py-[8px] flex items-center"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          >
            Next
          </button>
        </li>
      </ul>
      <span className="font-medium">
        Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
      </span>
    </footer>
  );
};

export default Pagination;
