import React, { SetStateAction, useEffect, useState } from "react";
import Combobox from "../ui/Combobox";

interface AddFormProps<T extends { [key: string]: any }, P extends { [key: string]: any }, A extends { [key: string]: any }, B extends { [key: string]: any }> {
  data4?: any[];
  datas?: P;
  datas2?: A[]; // It seems you want an array of strings
  datas3?: B[];
  data: T;
  setData: React.Dispatch<SetStateAction<T>>;
  onSubmit: (data: T) => void;
  onCancel: () => void;
  item: string;
  task: "update" | "add";
  page: string;
  modal?: () => void;
  callback?: (id: string) => void;
}

const AddForm = <T extends { [key: string]: any }, P extends { [key: string]: any }, A extends { [key: string]: any }, B extends { [key: string]: any }>({
  data4,
  datas3 = undefined,
  datas2 = undefined,
  datas = undefined,
  data,
  setData,
  onSubmit,
  onCancel,
  item,
  task,
  modal,
  callback,
  page,
}: AddFormProps<T, P, A, B>) => {
  const [updateImage, setUpdateImage] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Check if the field should be numeric
    const numericFields = ["discount", "price", "buy_price", "tax_rate", "quantity"];
    if (numericFields.includes(name)) {
      let parsedValue: string | number = value;

      if (name === "quantity") {
        // Ensure that quantity is a positive integer or zero (not negative)
        parsedValue = value === "" ? 0 : parseInt(value, 10); // Default to 0 if the value is empty

        if (parsedValue > 9999999) {
          alert("The maximum allowed value is 9,999,999.");
          return;
        }

        if (parsedValue < 0) {
          alert("Quantity cannot be negative.");
          return;
        }

        setData((prev) => ({
          ...prev,
          [name]: parsedValue,
        }));
        return;
      } else {
        // For other numeric fields, ensure it's a valid decimal number
        const decimalValue = value.replace(/^0+(?![.]|$)/, ""); // Remove leading zeros but allow decimals
        if (decimalValue !== "" && isNaN(Number(decimalValue))) {
          alert(`The field "${name}" must be a valid number.`);
          return;
        }

        if (parseFloat(decimalValue) <= 0 && name != "discount") {
          alert(`The field ${name} must be greater than zero`);
          return;
        }

        if (parseFloat(decimalValue) > 9999999 && name != "discount") {
          alert("The maximum allowed value is 9,999,999.");
          return;
        }

        if (parseFloat(decimalValue) >= 1 && name == "discount") {
          alert("Discount field cannot be greater than or equal to 1");
          return;
        }

        if (parseFloat(decimalValue) < 0 && name == "discount") {
          alert("Discount field cannot be negative value");
          return;
        }

        setData((prev) => ({
          ...prev,
          [name]: decimalValue === "" ? 0 : decimalValue, // Default to 0 if empty
        }));
        return;
      }
    }

    // Handle non-numeric fields
    setData((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));

    // Check for duplicate email
    if (name === "email" && datas) {
      if (datas.some((admin: any) => admin.email === value)) {
        alert("This email is already in use.");
        setData((prev) => ({
          ...prev,
          email: null,
        }));
      }
    }
  };

  function handleUploadImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setData((prev) => ({
        ...prev,
        image: file,
      }));
    }
    console.log("IMG UPDATED");
  }

  // Handle submit with validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate numeric fields
    const numericFields = ["discount", "price", "buy_price", "quantity"];
    for (const field of numericFields) {
      if (data[field] && isNaN(Number(data[field]))) {
        alert(`The field "${field}" must be a valid number.`);
        return;
      }

      // Ensure buy_price and price are not 0
      if ((field === "buy_price" || field === "price") && Number(data[field]) === 0) {
        alert(`The field "${field}" cannot be 0.`);
        return;
      }

      // Ensure quantity is not 0 (if applicable)
      if (field === "quantity" && Number(data[field]) === 0 && page !== "inventory") {
        alert("Quantity cannot be 0.");
        return;
      }

      // price must be greater than buy price
      if (field === "price" && data[field] <= data["buy_price"]) {
        alert("The item price must be greater than the buy price!");
        return;
      }
    }

    // Check if data.items exists and is empty
    if (data.items && data.items.length === 0) {
      alert("Items cannot be empty.");
      return;
    }

    try {
      await onSubmit(data as T);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle combobox item selection
  const handleComboboxSelect = (item: any) => {
    setData((prev) => ({
      ...prev,
      supplier_id: item,
    }));
  };

  const filteredCategory = datas3?.filter((category) => category.id === data.category_id);
  const filteredSupplier = datas2?.filter((supplier) => supplier.id === data.supplier_id);

  const handleCategorySelect = (id: number) => {
    setData((prev) => ({
      ...prev,
      category_id: id,
    }));
  };

  const handleDeleteItem = (index: number) => {
    if (!datas3) return;

    const updatedItems = [...datas3];
    updatedItems.splice(index, 1);

    // Recalculate the subtotal
    const newSubtotal = updatedItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    // Calculate total discount
    const newDiscount = updatedItems.reduce((acc, item) => acc + (item.discount || 0), 0);

    // Tax calculation from subtotal
    const taxRate = 0.1; // Example: 10% tax
    const newTax = newSubtotal * taxRate;

    // Calculate total amount
    const totalAmount = newSubtotal - newDiscount + newTax;

    // Update the state with the recalculated totals
    setData((prev) => ({
      ...prev,
      items: updatedItems,
      total_subtotal: newSubtotal,
      total_discount: newDiscount,
      total_tax: newTax,
      total_amount: "total_amount" in data ? totalAmount : undefined, // For Receipt type
      total_amount_due: "total_amount_due" in data ? totalAmount : undefined, // For PO type
    }));
  };

  useEffect(() => {
    console.log("FILTERED CATEGORY : ", filteredCategory);
    console.log("FILTERED supplier : ", filteredSupplier);
    console.log("UPDATE DATA : ", data);
  }, []);

  useEffect(() => {
    if (updateImage) {
      setData((prev) => ({
        ...prev,
        image: "erased",
      }));
    } else {
      setData((prev) => ({
        ...prev,
        image: null,
      }));
    }
  }, [updateImage]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">
        {task === "add" || page === "po" ? "Add New " : "Update "} {item}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(data)
          .filter(([key]) => key !== "id" && !key.includes("total"))
          .map(([key, value]) =>
            key === "role" ? (
              <select key={key} name={key} value={value || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none">
                <option value="" disabled>
                  Select {key}
                </option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            ) : key === "payment_method" ? (
              <select key={key} name={key} value={value || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none">
                <option value="" disabled>
                  Select Payment Method
                </option>
                <option value="CASH">CASH</option>
                <option value="CREDIT">CREDIT</option>
              </select>
            ) : key === "currency" ? (
              <select key={key} name={key} value={value || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none">
                <option value="" disabled>
                  Select Currency
                </option>
                <option value="USD">USD</option>
              </select>
            ) : (
              key !== "items" &&
              key !== "status" &&
              key !== "supplier_id" &&
              key !== "category_id" &&
              key !== "created_at" && (
                <div key={key}>
                  {key === "image" && task === "update" && page == "item" ? (
                    <>
                      <button
                        onClick={() => {
                          setUpdateImage((prev) => !prev);
                        }}
                        className="px-3 py-2 rounded-md hover:cursor-pointer bg-zinc-800 hover:opacity-90 transition duration-150 text-zinc-100 font-semibold"
                        type="button"
                      >
                        {updateImage ? "Cancel" : "Update image"}
                      </button>

                      {updateImage && (
                        <>
                          <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </label>

                          <input key={key} type="file" name={key} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} value={undefined} onChange={handleUploadImg} className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>

                      <input
                        required={(task === "add" || task === "update") && (page === "item" || page === "tax" || page === "categories") && key !== "image"}
                        key={key}
                        type={key === "image" ? "file" : typeof value === "number" ? "number" : key.includes("date") ? "date" : key === "email" ? "email" : "text"}
                        name={"HELLO"}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={key === "image" ? undefined : String(value ?? "")}
                        onChange={key === "image" ? handleUploadImg : handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        readOnly={(key === "tax_id" && !!value) || (page === "inventory" && key === "item_id")}
                      />
                    </>
                  )}
                </div>
              )
            )
          )}

        {/* Conditional Rendering for Combobox */}
        {(page === "po" || page === "receipt") && datas && (
          <div>
            {page !== "receipt" && <Combobox task="Supplier" data={datas2 === undefined ? [] : datas2} onSelect={handleComboboxSelect} searchKey={"name"} />}

            <div>
              {datas3 && datas3.length > 0 ? (
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">#</th>
                      <th className="px-4 py-2 border">Item</th>
                      <th className="px-4 py-2 border">Quantity</th>
                      <th className="px-4 py-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas3.map((value, index) => (
                      <tr key={index} className="text-center">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{value.item_id ? data4!.filter((item) => item.id === value.item_id)[0].nama : data4!.filter((item) => item.id === value.items_id)[0].nama}</td>
                        <td className="px-4 py-2 border">{value.quantity}</td>
                        <td className="px-4 py-2 border">
                          <button type="button" onClick={() => handleDeleteItem(index)} className="text-red-600 hover:underline">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No items available.</p>
              )}
            </div>

            <div className="mt-8 p-6 bg-zinc-100 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Purchase Order Summary</h3>
              <ul>
                {page === "receipt" && (
                  <>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Total Subtotal:</span>
                      <span className="text-lg font-semibold">${data.total_subtotal ? data.total_subtotal.toFixed(2) : "0.00"}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Total Discount:</span>
                      <span className="text-lg font-semibold">${data.total_discount ? data.total_discount.toFixed(2) : "0.00"}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="font-medium">Total Tax:</span>
                      <span className="text-lg font-semibold">${data.total_tax ? data.total_tax.toFixed(2) : "0.00"}</span>
                    </li>
                  </>
                )}
                <li className="flex justify-between py-2 border-b">
                  <span className="font-medium">Total Amount Due:</span>
                  <span className="text-lg font-semibold">${data.total_amount_due ? data.total_amount_due.toFixed(2) : data.total_amount ? data.total_amount.toFixed(2) : "0.00"}</span>
                </li>
              </ul>
            </div>

            <button className="w-full py-2 shadow-sm my-6 border rounded-md hover:cursor-pointer hover:bg-zinc-50 duration-150 transition" onClick={modal} type="button">
              + Add Item
            </button>
          </div>
        )}

        {page === "item" && task === "add" && datas && callback && (
          <div>
            <Combobox task="Category" data={datas3 === undefined ? [] : datas3} onSelect={handleCategorySelect} searchKey={"category_name"} />
            <Combobox task="Supplier" data={datas2 === undefined ? [] : datas2} onSelect={callback} searchKey={"name"} />
          </div>
        )}

        {page === "item" && task === "update" && datas && callback && (
          <div>
            <Combobox value={filteredCategory && filteredCategory.length > 0 ? filteredCategory[0].category_name : ""} task="Category" data={datas3 || []} onSelect={handleCategorySelect} searchKey={"category_name"} />
            <Combobox value={filteredSupplier && filteredSupplier.length > 0 ? filteredSupplier[0].name : ""} task="Supplier" data={datas2 || []} onSelect={callback} searchKey={"name"} />
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            {task === "add" ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
