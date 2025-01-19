import React, { SetStateAction, useEffect, useState } from "react";
import { AllItems, ReceiptDetailPayload } from "../../types/types";
import Combobox from "../ui/Combobox";
import { resetState } from "../../utils/commonUtils";

interface POModalProps {
  data: AllItems[];
  setOpen: React.Dispatch<SetStateAction<{ index: number; open: boolean }>>;
  onSubmit: (payload: ReceiptDetailPayload) => void;
  updatedItem: ReceiptDetailPayload;
  setUpdateItem: React.Dispatch<SetStateAction<ReceiptDetailPayload>>;
}

const UpdateReceiptItemModal = ({ data, setOpen, updatedItem, setUpdateItem, onSubmit }: POModalProps) => {
  const [receiptDetail, setReceiptDetail] = useState<ReceiptDetailPayload>({
    items_id: "",
    quantity: 0,
    unit_price: 0,
    unit_discount: 0,
  });

  // Toggle modal visibility
  const handleCloseModal = () => {
    setOpen({
      index: -1,
      open: false,
    });

    // handle reset state
    resetState(setUpdateItem, updatedItem);
  };

  const handleSelect = (itemID: string | null) => {
    if (!itemID) {
      setReceiptDetail((prev) => ({
        ...prev,
        items_id: "",
      }));
      resetState(setReceiptDetail, receiptDetail);
      return;
    }

    const selectedItem = data?.find((item) => item.id === itemID); // Find the selected item
    if (selectedItem) {
      setReceiptDetail((prev) => ({
        ...prev,
        items_id: itemID,
        unit_price: selectedItem.buy_price, // Set unit_price to buy_price of the selected item
        unit_discount: selectedItem.discount,
      }));
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // handle if name is quantity
    let parsedValue: number | string = value;

    if (name === "quantity") {
      parsedValue = parseInt(value, 10);

      if (isNaN(parsedValue) || parsedValue < 0) {
        parsedValue = 0;
      }
    }

    setReceiptDetail((prev) => ({
      ...prev,
      [name]: parsedValue === "" ? null : parsedValue, // if value is empty string, set it to null
    }));
  };

  // Submit update form data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("UPDATED PO ITEM PAYLOAD : ", receiptDetail);

    onSubmit(receiptDetail);
    resetState(setReceiptDetail, receiptDetail);
    handleCloseModal();
  };

  useEffect(() => {
    console.log("ITEMS DATA IN RECEIPT MODAL : ", data);
    setReceiptDetail(updatedItem);
  }, []);

  useEffect(() => {
    console.log("RECEIPT UPDATE SELECTED : ", receiptDetail);
  }, [setReceiptDetail]);

  const selectedItem = data?.filter((item) => item.id === updatedItem.items_id);

  return (
    <div>
      (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseModal}>
        <div
          className="bg-white rounded-lg shadow-lg w-1/2 max-w-full relative p-8"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <h2 className="text-xl font-bold mb-4">Update transaction item</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (!receiptDetail.items_id) {
                alert("Please select an item");
                return;
              }

              if (receiptDetail.quantity === 0) {
                alert("Quantity cannot be zero");
                return;
              }

              handleSubmit(e);
            }}
          >
            <Combobox task={"Item"} data={data} onSelect={handleSelect} searchKey={"nama"} value={selectedItem.length > 0 ? selectedItem[0].nama : ""} />
            {Object.entries(receiptDetail)
              .filter(([key]) => key !== "items_id") // Filter out items_id
              .map(
                ([key, value]) =>
                  key !== "items_id" && (
                    <div key={key} className="mb-4">
                      <label className="block text-gray-700 mb-2 capitalize">{key.replace("_", " ")}</label>
                      <input
                        required
                        key={key}
                        type={key === "image" ? "file" : typeof value === "number" ? "number" : key === "exp_date" ? "date" : "text"}
                        name={key}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={
                          key === "image"
                            ? undefined
                            : key === "exp_date" && value
                            ? new Date(value).toISOString().slice(0, 10) // Convert to YYYY-MM-DD
                            : String(value ?? "")
                        }
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none`}
                        readOnly={key === "unit_price" || key === "unit_discount"} // Make readonly for these fields
                      />
                    </div>
                  )
              )}
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
              Submit
            </button>
          </form>
          <button onClick={handleCloseModal} className="absolute top-8 right-8 text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
      </div>
      )
    </div>
  );
};

export default UpdateReceiptItemModal;
