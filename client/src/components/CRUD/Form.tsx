import React, { SetStateAction } from "react";

interface AddFormProps<T extends { [key: string]: any }, P extends { [key: string]: any }> {
  datas?: P;
  data: T;
  setData: React.Dispatch<SetStateAction<T>>;
  onSubmit: (data: T) => void;
  onCancel: () => void;
  item: string;
  task: "update" | "add";
}

const AddForm = <T extends { [key: string]: any }, P extends { [key: string]: any }>({ datas = undefined, data, setData, onSubmit, onCancel, item, task }: AddFormProps<T, P>) => {
  // handle input change
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
          email: null, // if value is empty string, set it to null
        }));

        return;
      }
    }
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await onSubmit(data as T);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">
        {task === "add" ? "Add New " : "Update "} {item}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.entries(data)
          .filter(([key]) => key !== "id")
          .map(([key, value]) =>
            key === "role" ? (
              // Dropdown for "role" key
              <select
                key={key}
                name={key}
                value={value || ""} // Ensuring the value is either the selected value or empty string
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              >
                <option value="" disabled>
                  Select {key}
                </option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            ) : (
              // Default input for other keys
              <input
                required={task === "add"}
                key={key}
                type="text"
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value === null || value === undefined ? "" : String(value)}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            )
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
