import React from "react";

function Pagination({pageNum}) {
  return (
    <a
      href="#"
      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 font-bold hover:bg-red-700 bg-red-600 focus:z-20 focus:outline-offset-0 md:inline-flex"
    >
      {pageNum}
    </a>
  );
}

export default Pagination;
