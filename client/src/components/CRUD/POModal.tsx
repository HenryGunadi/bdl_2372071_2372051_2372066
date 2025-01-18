import React, { SetStateAction, useEffect, useState } from "react";
import { PODetailPayload } from "../../types/types";
import Combobox from "../ui/Combobox";
import { resetState } from "../../utils/commonUtils";

interface POModalProps<TData, TData2> {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  data: TData[];
  data2?: TData2[];
  supplier_id: string;
  onSubmit: (payload: PODetailPayload) => void;
}

const POModal = <TData extends { [key: string]: any }, TData2 extends { [key: string]: any }>({ open, setOpen, data, data2, onSubmit, supplier_id }: POModalProps<TData, TData2>) => {
  const [PODetail, setPODetail] = useState<PODetailPayload>({
    item_id: "",
    quantity: 0,
    unit_price: 0,
  });

  // Toggle modal visibility
  const toggleModal = () => setOpen(!open);

  const handleSelect = (itemID: string) => {
    const selectedItem = data?.find((item) => item.id === itemID); // Find the selected item
    if (selectedItem) {
      setPODetail((prev) => ({
        ...prev,
        item_id: itemID,
        unit_price: selectedItem.buy_price, // Set unit_price to buy_price of the selected item
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

    setPODetail((prev) => ({
      ...prev,
      [name]: parsedValue === "" ? null : parsedValue, // if value is empty string, set it to null
    }));
  };

  // Submit form data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(PODetail);
    resetState(setPODetail, PODetail);
    toggleModal(); // Close modal after submission
  };

  useEffect(() => {
    console.log("ITEMS DATA IN POMODAL : ", data);
  }, []);

  const filteredItems = data?.filter((items) => items.supplier_id === supplier_id);

  useEffect(() => {
    if (open && filteredItems.length === 0) {
      alert("Supplier does not have an item.");
      toggleModal(); // Close modal after alerting
    }
  }, [open, filteredItems]);

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={toggleModal}>
          <div
            className="bg-white rounded-lg shadow-lg w-1/2 max-w-full relative p-8"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-xl font-bold mb-4">Add PO Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!PODetail.item_id) {
                  alert("Please select an item");
                  return;
                }

                if (PODetail.quantity === 0) {
                  alert("Quantity cannot be zero");
                  return;
                }

                handleSubmit(e);
              }}
            >
              <Combobox task={"Item"} data={filteredItems} onSelect={handleSelect} searchKey={"nama"} />
              {Object.entries(PODetail)
                .filter(([key]) => key !== "item_id") // Don't show item_id in the form fields
                .map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <label className="block text-gray-700 mb-2 capitalize">{key.replace("_", " ")}</label>
                    <input
                      required
                      key={key}
                      type={key === "image" ? "file" : typeof value === "number" ? "number" : key === "exp_date" ? "date" : "text"}
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={key === "unit_price" ? PODetail.unit_price : String(value ?? "")} // Check if key is unit_price, set its value accordingly
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                      readOnly={key === "unit_price"} // Set unit_price to readOnly
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

export default POModal;
