import React, { SetStateAction, useState } from "react";
import { ReceiptDetailPayload } from "../../types/types";
import Combobox from "../ui/Combobox";
import { resetState } from "../../utils/commonUtils";

interface ReceiptModalProps<TData, TData2> {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  data: TData[];
  data2?: TData2[];
  onSubmit: (payload: ReceiptDetailPayload) => void;
}

const ReceiptModal = <TData extends { [key: string]: any }, TData2 extends { [key: string]: any }>({ open, setOpen, data, data2, onSubmit }: ReceiptModalProps<TData, TData2>) => {
  const [receiptDetail, setReceiptDetail] = useState<ReceiptDetailPayload>({
    items_id: "",
    unit_price: 0,
    quantity: 0,
    unit_discount: 0,
  });

  // Toggle modal visibility
  const toggleModal = () => {
    resetState(setReceiptDetail, receiptDetail);
    setOpen(!open);
  };

  const handleSelect = (itemID: string | null) => {
    if (!itemID) {
      resetState<ReceiptDetailPayload>(setReceiptDetail, receiptDetail);
      return;
    }

    console.log("ITEM ID RECEIPT SELECTED : ", itemID);
    const filteredItemSelected = data.filter((value, key) => value.item_id === itemID); // wrong itemID
    console.log("FILTERED ITEMS SELECTED : ", filteredItemSelected);

    if (filteredItemSelected.length > 0) {
      console.log("Selected Item: ", filteredItemSelected[0]);

      setReceiptDetail((prev) => ({
        ...prev,
        items_id: itemID,
        unit_price: filteredItemSelected[0].price,
        unit_discount: filteredItemSelected[0].discount,
      }));
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: number | string = value;

    if (name === "quantity") {
      parsedValue = parseInt(value, 10); // Ensure it's an integer

      // Ensure parsed value is a valid positive integer
      if (isNaN(parsedValue) || parsedValue < 0) {
        parsedValue = 0; // Set to 0 if invalid
      }

      // Find the selected item's available quantity
      const selectedItem = data.find((item) => item.item_id === receiptDetail.items_id);
      const availableQuantity = selectedItem?.quantity ?? 0;

      // Ensure the entered quantity does not exceed available stock
      if (parsedValue > availableQuantity) {
        alert(`Quantity cannot exceed available stock (${availableQuantity}).`);
        parsedValue = availableQuantity; // Set to max available
      }
    }

    setReceiptDetail((prev) => ({
      ...prev,
      [name]: parsedValue === "" ? null : parsedValue, // If empty string, set to null
    }));
  };

  // Submit form data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if there are no items available in the data
    if (!data || data.length === 0) {
      alert("No items available. Please add items before submitting.");
      return;
    }

    if (!receiptDetail.items_id) {
      alert("Please select an item.");
      return;
    }

    // Check if the quantity is 0
    if (receiptDetail.quantity === 0) {
      alert("Quantity cannot be 0.");
      return;
    }

    if (receiptDetail.quantity >= 99999) {
      alert("Quantity cannot be larger than 99999");
      return;
    }

    onSubmit(receiptDetail);
    resetState(setReceiptDetail, receiptDetail);
    toggleModal(); // Close modal after submission
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={toggleModal}>
          <div
            className="bg-white rounded-lg shadow-lg w-1/2 max-w-full relative p-8"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl font-bold mb-4">Add Purchase Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!receiptDetail.items_id) {
                  alert("Please select an item");
                  return;
                }

                handleSubmit(e);
              }}
            >
              {data && <Combobox task={"Item"} data={data} onSelect={handleSelect} searchKey={"nama"} page="receipt" />}

              {/* Label for showing selected item quantity */}
              {receiptDetail.items_id && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Available Quantity:</label>
                  <p className="text-lg font-semibold">{data.find((item) => item.item_id === receiptDetail.items_id)?.quantity ?? "N/A"}</p>
                </div>
              )}
              {Object.entries(receiptDetail)
                .filter(([key]) => key !== "items_id") // Filter out items_id
                .map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <label className="block text-gray-700 mb-2 capitalize">{key.replace("_", " ")}</label>
                    <input
                      required
                      key={key}
                      type={key === "image" ? "file" : typeof value === "number" ? "number" : key === "exp_date" ? "date" : "text"}
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={key === "image" ? undefined : String(value ?? "")}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none`}
                      readOnly={key === "unit_price" || key === "unit_discount"} // Make readonly for these fields
                    />
                  </div>
                ))}
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
                Submit
              </button>
            </form>
            <button onClick={toggleModal} className="absolute top-8 right-8 text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptModal;
