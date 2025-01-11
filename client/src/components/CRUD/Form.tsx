import React, { SetStateAction, useEffect } from "react";
import { Button } from "../ui/button";
import Combobox from "../ui/Combobox";
import { callbackify } from "util";

interface AddFormProps<T extends { [key: string]: any }, P extends { [key: string]: any }, A extends { [key: string]: any }, B extends { [key: string]: any }> {
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
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value === "" ? null : value, // if value is empty string, set it to null
    }));

    // Check for duplicate email
    if (name === "email" && datas) {
      if (datas.some((admin: any) => admin.email === value)) {
        alert("This email is already in use.");
        setData((prev) => ({
          ...prev,
          email: null, // Reset email field to null if duplicate is found
        }));
        return;
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

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

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
              key !== "category_id" && (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>

                  <input
                    required={(task === "add" || task === "update") && page === "item" && key !== "image"}
                    key={key}
                    type={key === "image" ? "file" : typeof value === "number" ? "number" : key === "exp_date" ? "date" : "text"}
                    name={key}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={
                      key === "image"
                        ? undefined
                        : key === "exp_date"
                        ? new Date(value).toISOString().slice(0, 10) // Convert to YYYY-MM-DD
                        : String(value ?? "")
                    }
                    onChange={key === "image" ? handleUploadImg : handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>
              )
            )
          )}

        {/* Conditional Rendering for Combobox */}
        {page === "po" && datas && (
          <div>
            <Combobox task="Supplier" data={datas2 === undefined ? [] : datas2} onSelect={handleComboboxSelect} searchKey={"name"} />

            <div>
              {datas3 && datas3?.length > 0 ? (
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">#</th>
                      <th className="px-4 py-2 border">Item ID</th>
                      <th className="px-4 py-2 border">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas3.map((value, index) => (
                      <tr key={index} className="text-center">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{value.item_id}</td>
                        <td className="px-4 py-2 border">{value.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No items available.</p>
              )}
            </div>

            <Button className="w-full py-5 shadow-md my-6" variant={"outline"} toggleModal={modal}>
              + Add Item
            </Button>
          </div>
        )}

        {page === "item" && task === "add" && datas && callback && (
          <div>
            <Combobox task="Category" data={datas3 === undefined ? [] : datas3} onSelect={callback} searchKey={"category_name"} />
            <Combobox task="Supplier" data={datas2 === undefined ? [] : datas2} onSelect={callback} searchKey={"name"} />
          </div>
        )}

        {page === "item" ||
          (task === "update" && datas && callback && filteredCategory && filteredSupplier && (
            <div>
              {filteredCategory.length > 0 && <Combobox value={filteredCategory[0].category_name} task="Category" data={datas3 === undefined ? [] : datas3} onSelect={callback} searchKey={"category_name"} />}
              {filteredSupplier.length > 0 && <Combobox value={filteredSupplier[0].name} task="Supplier" data={datas2 === undefined ? [] : datas2} onSelect={callback} searchKey={"name"} />}
            </div>
          ))}

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
