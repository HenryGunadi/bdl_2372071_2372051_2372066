import React, { SetStateAction } from "react";

interface EditFormProps<T extends { [key: string]: any }, P> {
  data: T;
  setData: React.Dispatch<SetStateAction<T>>;
  setDataCallback: React.Dispatch<SetStateAction<P>>;
  onSubmit: (data: T) => void;
  callback: (setData: React.Dispatch<SetStateAction<P>>) => void;
  onCancel: () => void;
  item: string;
}

const EditForm = <T extends { [key: string]: any }, P>({ data, setData, setDataCallback, onSubmit, onCancel, item, callback }: EditFormProps<T, P>) => {
  const [formData, setFormData] = React.useState(data);

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await onSubmit(data as T);
      await callback(setDataCallback);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Edit Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none" />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
