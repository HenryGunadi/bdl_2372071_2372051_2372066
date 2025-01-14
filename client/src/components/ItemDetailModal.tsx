import { useEffect } from "react";
import { AllItems } from "../types/types";

interface ItemDetailModalProps {
  item: AllItems;
  onClose: () => void; // Function to close the modal
}

export default function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  useEffect(() => {
    console.log("ITEM DETAIL : ", item);
  }, [item]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-1/2 max-w-screen-sm sm:w-full h-auto sm:h-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{item.nama}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            X
          </button>
        </div>
        <img
          src={`./assets/db/${item.image_url}`}
          alt={item.nama}
          className="w-full h-full object-cover mb-4 rounded-md object-center" // Adjust height for image
        />
        <p className="text-gray-700 mb-4">{item.description}</p>
        <div className="mb-4">
          <p className="font-medium">Category: {item.category_name}</p>
          <p className="font-medium">Price: ${item.price}</p>
          <p className="font-medium">Buy Price: ${item.buy_price}</p>
          <p className="font-medium">Supplier: {item.supplier_name}</p>
          {item.discount > 0 && <p className="text-green-500">Discount: {item.discount}%</p>}
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">Created at: {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
