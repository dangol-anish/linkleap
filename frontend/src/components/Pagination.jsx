import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <footer className="border-t border-linkleap-border h-[7vh] w-full px-4  md:px-6 py-4 flex justify-between items-center mt-auto">
      <span className="font-medium">
        Page {currentPage} of {Math.ceil(totalItems / itemsPerPage)}
      </span>
      <ul className="flex gap-3">
        <li className="flex items-center">
          <button
            className="border border-linkleap-border font-medium rounded-md px-3 py-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        <li className="flex items-center">
          <button
            className="border border-linkleap-border font-medium rounded-md px-3 py-2"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          >
            Next
          </button>
        </li>
      </ul>
    </footer>
  );
};

export default Pagination;
