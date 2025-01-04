import { useEffect, useState } from "react";
import { Items } from "../types/types";
import { fetchItems } from "../utils/Item";

function ItemDashboard() {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    fetchItems(setItems);
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex w-1/2 h-1/2 overflow-y-scroll rounded-md border shadow-sm">
        {items
          .filter((item: Items) => item.id === "ITM-0008")
          .map((item: Items, index: number) => (
            <div key={index} className="flex gap-4 p-4">
              <img src={`../../public/assets/db/${item.image_url}`} alt={item.nama} className="w-10 h-10" />
              <div>{item.nama}</div>
              <div>{item.price}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ItemDashboard;
