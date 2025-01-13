import React, { SetStateAction } from "react";

export function resetState<T extends { [key: string]: any }>(setState: React.Dispatch<React.SetStateAction<T>>, initialValues: T): void {
  const resetObj: { [key: string]: any } = {};

  for (const key in initialValues) {
    resetObj[key] = initialValues[key] === null ? null : ""; // Set to null if null, or empty string otherwise
  }

  setState(resetObj as T); // Update the state directly with the reset values
}

// handle pagination
export const handlePagination = (direction: "next" | "prev", data: any[], currentPage: number, setPage: (page: number) => void) => {
  const totalPages = Math.ceil(data.length / 5); // Adjust based on adminsPerPage

  if (direction === "next" && currentPage < totalPages) {
    setPage(currentPage + 1);
  } else if (direction === "prev" && currentPage > 1) {
    setPage(currentPage - 1);
  }
};
