import React, { SetStateAction } from "react";

interface UpdateModalProps {
  onUpdate: () => void;
  onCancel: () => void;
}

const UpdatePOModal: React.FC<UpdateModalProps> = ({ onUpdate, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Accept Purchaese Order</h2>
        <p>Are you sure you want to accept purchase order?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
            Cancel
          </button>
          <button type="button" onClick={onUpdate} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:opacity-70 duration-150 transition">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePOModal;
