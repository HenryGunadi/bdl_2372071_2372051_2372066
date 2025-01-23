import React, { useEffect, useState } from "react";
import { Inventory } from "../types/types";
import { viewInventories } from "../utils/inventoryUtils";
import { AlertTriangle, Package } from "lucide-react"; // Modern icons for UI clarity

const LowStockAlert: React.FC = () => {
  const [inventories, setInventories] = useState<Inventory[]>([]);

  useEffect(() => {
    viewInventories(setInventories);
  }, []);

  const lowStockItems = inventories.filter((inventory) => inventory.quantity < 10);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white text-gray-900 shadow-md rounded-lg border border-gray-300">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-yellow-500" size={24} />
        <h2 className="text-lg font-semibold">Low Stock Alert</h2>
      </div>

      {lowStockItems.length > 0 ? (
        <ul className="space-y-3">
          {lowStockItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md border border-gray-200">
              <div className="flex gap-3 items-center">
                <Package className="text-gray-600" size={20} />
                <div>
                  <span className="font-medium">{item.nama}</span>
                  <p className="text-sm text-gray-500">ID: {item.item_id}</p>
                </div>
              </div>
              <span className="text-red-500 font-bold">{item.quantity} left</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-600 flex items-center gap-2">✅ All items are well-stocked!</p>
      )}
    </div>
  );
};

export default LowStockAlert;
