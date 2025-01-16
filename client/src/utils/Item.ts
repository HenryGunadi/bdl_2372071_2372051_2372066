import axios from "axios";
import { AllItems, CreateItemPayload, Items, UpdateItemPayload } from "../types/types";
import React from "react";

export const backendBaseAPI: string = import.meta.env.VITE_BACKEND_API || "";

async function fetchItems(setItem: React.Dispatch<React.SetStateAction<AllItems[]>>) {
  try {
    const response = await axios.get(`${backendBaseAPI}/api/items/view`);

    if (response.data) {
      console.log(response.data);
      setItem(response.data.items);
    }
  } catch (err) {
    console.error("Error fetching items : ", err);
  }
}

async function createItem(item: CreateItemPayload) {
  try {
    console.log("ITEM PAYLOAD FRONTEND: ", item);

    const formData = new FormData();
    formData.append("nama", item.nama);
    formData.append("price", String(item.price));
    formData.append("supplier_id", item.supplier_id);
    formData.append("description", item.description);
    formData.append("discount", item.discount?.toString() || "");
    formData.append("category_id", String(item.category_id));
    formData.append("buy_price", String(item.buy_price));
    if (item.image) {
      formData.append("image", item.image);
    }

    const response = await axios.post(`${backendBaseAPI}/api/items/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);
    alert("Item Created");
    window.location.reload(); // Refresh the page
  } catch (err) {
    console.error("Error creating an item : ", err);
    alert(`Error creating an item : ${err}`);
  }
}

export async function deleteItem(id: string) {
  try {
    const res = await axios.delete(`${backendBaseAPI}/api/items/delete?id=${id}`, {
      withCredentials: true,
    });

    console.log(res);
    alert("Item deleted.");
    window.location.reload(); // Refresh the page
  } catch (err) {
    console.error(err);
    alert("Cannot delete this item. It is currently in use or linked to other records.");
  }
}

export async function updateItem(payload: UpdateItemPayload) {
  try {
    console.log("UPDATE PAYLOAD FROM FRONTEND : ", payload);
    console.log("UPDATE PAYLOAD BUY PRICE : ", payload.buy_price)

    const formData = new FormData();
    formData.append("id", payload.id);
    formData.append("nama", payload.nama);
    formData.append("price", String(payload.price));
    formData.append("supplier_id", payload.supplier_id);
    formData.append("description", payload.description);
    formData.append("discount", payload.discount?.toString() || "");
    formData.append("category_id", String(payload.category_id));
    formData.append("buy_price", String(payload.buy_price))
    if (payload.image) {
      formData.append("image", payload.image);
    }

    const response = await axios.post(`${backendBaseAPI}/api/items/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);
    alert("Item updated");
    window.location.reload(); // Refresh the page
  } catch (err) {
    console.error(err);
    alert("Update Error");
  }
}

export { fetchItems, createItem };
