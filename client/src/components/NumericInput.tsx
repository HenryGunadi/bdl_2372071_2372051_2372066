import React from "react";

export const NumericInput = ({ name, value, onChange }: { name: string; value: number | string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  // Handle numeric input without allowing empty value
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Prevent empty string, allow valid numeric values
    if (/^-?\d*\.?\d*$/.test(value)) {
      if (value !== "") {
        onChange(e);
      }
    }
  };

  return <input type="text" name={name} value={value} onChange={handleNumericChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none" placeholder="Enter a number" />;
};
