import { useEffect, useState } from "react";

// Generic ComboboxProps to accept any type
interface ComboboxProps<TData> {
  data: TData[];
  value?: string;
  onSelect: (id: string) => void;
  searchKey: keyof TData;
  task: string;
}

const Combobox = <TData extends { [key: string]: any }>({ data, onSelect, searchKey, task, value }: ComboboxProps<TData>) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredData = data.filter((item) => item[searchKey].toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    console.log("Combo data : ", data);
  }, [data]);

  useEffect(() => {
    if (value) {
      setSearch(value);
    }
  }, []);

  return (
    <div className="relative w-full max-w-md mb-4">
      {/* Input field */}
      <label htmlFor={task} className="block text-sm font-medium text-gray-700 my-4">
        {task.charAt(0).toUpperCase() + task.slice(1)}
      </label>
      <input
        id={task}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        placeholder="Search..."
      />

      {/* Dropdown list */}
      {open && filteredData.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg z-10">
          {filteredData.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(item.id);
                setSearch(item[searchKey]);
                setOpen(false);
                alert(`Supplier id : ${item.id}`);
              }}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {item[searchKey]} {/* Display value of the 'searchKey' */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Combobox;
