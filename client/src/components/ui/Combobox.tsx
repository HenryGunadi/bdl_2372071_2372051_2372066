import { useEffect, useState } from "react";

// Generic ComboboxProps to accept any type
interface ComboboxProps<TData> {
  data: TData[];
  value?: string;
  onSelect: (id: any) => void;
  searchKey: keyof TData;
  task: string;
  task2?: string;
}

const Combobox = <TData extends { [key: string]: any }>({ data, onSelect, searchKey, task, value, task2 }: ComboboxProps<TData>) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  let selectionMade = false;

  const filteredData = data.filter((item) => item[searchKey].toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    console.log("Combo data : ", data);
  }, [data]);

  useEffect(() => {
    if (value) {
      setSearch(value);
    }
  }, [value]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    setOpen(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!selectionMade) {
        if (search !== value || filteredData.some((item) => item[searchKey] !== search)) {
          onSelect(null);
          setSearch("");
        }
        setOpen(false);
      }
      selectionMade = false;
    }, 200);
  };

  const handleSelect = (item: TData) => {
    onSelect(item.id);
    setSearch(item[searchKey]);
    setOpen(false);
    selectionMade = true;
  };

  return (
    <div className="relative w-full max-w-md mb-4">
      {/* Input field */}
      <label htmlFor={task} className="block text-sm font-medium text-gray-700 my-4">
        {task.charAt(0).toUpperCase() + task.slice(1)}
      </label>
      <input id={task} type="text" value={search} onChange={handleSearchChange} onFocus={() => setOpen(true)} onBlur={handleBlur} className="w-full px-4 py-2 border rounded-lg focus:outline-none" placeholder="Search..." />

      {/* Dropdown list */}
      {open && filteredData.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto shadow-lg z-10">
          {filteredData.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)} className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              {item[searchKey]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Combobox;
