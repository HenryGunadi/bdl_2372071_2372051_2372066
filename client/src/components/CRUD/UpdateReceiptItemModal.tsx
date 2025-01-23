import React, { SetStateAction, useEffect, useState } from "react";
import { Inventory, ReceiptDetailPayload } from "../../types/types";
import Combobox from "../ui/Combobox";
import { resetState } from "../../utils/commonUtils";

interface POModalProps {
  data: Inventory[];
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

  // Close modal and reset states
  const handleCloseModal = () => {
    setOpen({
      index: -1,
      open: false,
    });
    resetState(setUpdateItem, updatedItem);
  };

  const handleSelect = (itemID: string | null) => {
    if (!itemID) {
      resetState(setReceiptDetail, receiptDetail);
      return;
    }

    const selectedItem = data?.find((item) => item.item_id === itemID);
    if (selectedItem) {
      setReceiptDetail((prev) => ({
        ...prev,
        items_id: itemID,
        unit_price: selectedItem.price,
        unit_discount: selectedItem.discount,
        quantity: 0, // Reset quantity for new selection
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      let parsedQuantity = parseInt(value, 10);

      // Ensure the input is a valid number
      if (isNaN(parsedQuantity) || parsedQuantity < 0) {
        parsedQuantity = 0;
      }

      // Validate against available stock
      const selectedItem = data.find((item) => item.item_id === receiptDetail.items_id);
      const availableStock = selectedItem?.quantity ?? 0;

      if (parsedQuantity > availableStock) {
        alert(`Quantity cannot exceed available stock (${availableStock}).`);
        parsedQuantity = availableStock;
      }

      setReceiptDetail((prev) => ({
        ...prev,
        [name]: parsedQuantity,
      }));
    } else {
      setReceiptDetail((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!receiptDetail.items_id) {
      alert("Please select an item");
      return;
    }

    if (receiptDetail.quantity === 0) {
      alert("Quantity cannot be zero.");
      return;
    }

    onSubmit(receiptDetail);
    resetState(setReceiptDetail, receiptDetail);
    handleCloseModal();
  };

  useEffect(() => {
    setReceiptDetail(updatedItem);
  }, [updatedItem]);

  const selectedItem = data?.find((item) => item.item_id === receiptDetail.items_id);

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleCloseModal}>
        <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-full relative p-8" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-xl font-bold mb-4">Update Transaction Item</h2>
          <form onSubmit={handleSubmit}>
            <Combobox task={"Item"} data={data} onSelect={handleSelect} searchKey={"nama"} value={selectedItem?.nama ?? ""} page="receipt" />

            {receiptDetail.items_id && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Available Quantity:</label>
                <p className="text-lg font-semibold">{selectedItem?.quantity ?? "N/A"}</p>
              </div>
            )}

            {Object.entries(receiptDetail)
              .filter(([key]) => key !== "items_id")
              .map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label className="block text-gray-700 mb-2 capitalize">{key.replace("_", " ")}</label>
                  <input
                    required
                    type={key === "quantity" ? "number" : "text"}
                    name={key}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={String(value ?? "")}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none`}
                    readOnly={key === "unit_price" || key === "unit_discount"}
                  />
                </div>
              ))}

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
              Submit
            </button>
          </form>
          <button onClick={handleCloseModal} className="absolute top-8 right-8 text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateReceiptItemModal;
