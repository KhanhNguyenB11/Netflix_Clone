import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
function Pagination({ totalPages, currentPage, onPageChange }) {
  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="flex justify-center w-full items-center gap-3">
      <MdChevronLeft
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-red-600 text-white p-2 cursor-pointer hover:bg-red-700 transition-colors duration-300"
        size={40}
      ></MdChevronLeft>
      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          disabled={pageNum === currentPage}
        >
          {pageNum}
        </button>
      ))}
      <MdChevronRight
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-red-600 text-white p-2 cursor-pointer hover:bg-red-700 transition-colors duration-300"
        size={40}
      ></MdChevronRight>
    </div>
  );
}

export default Pagination;
