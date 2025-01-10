import React, { SetStateAction } from "react";

export function resetState<T extends { [key: string]: any }>(setState: React.Dispatch<React.SetStateAction<T>>, initialValues: T): void {
  const resetObj: { [key: string]: any } = {};

  for (const key in initialValues) {
    resetObj[key] = initialValues[key] === null ? null : ""; // Set to null if null, or empty string otherwise
  }

  setState(resetObj as T); // Update the state directly with the reset values
}

// handle pagination
export function handlePagination<T>(direction: string, data: T[], currentPage: number, setCurrentPage: React.Dispatch<SetStateAction<number>>) {
  if (direction === "next") {
    if (currentPage < Math.ceil(data.length / 5)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  } else if (direction === "prev") {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }
}
