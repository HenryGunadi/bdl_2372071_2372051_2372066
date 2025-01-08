import axios from "axios";
import { CreateItemPayload, Items } from "../types/types";
import React from "react";

const backendBaseAPI: string = import.meta.env.VITE_BACKEND_API || "";

async function fetchItems(setItem: React.Dispatch<React.SetStateAction<Items[]>>) {
  try {
    const response = await axios.get(`${backendBaseAPI}/api/items/search`);

    if (response.data) {
      console.log(response.data);
      setItem(response.data.items);
    }
  } catch (err) {
    console.error("Error fetching items : ", err);
  }
}

async function createItem(e: React.FormEvent<HTMLFormElement>, item: CreateItemPayload) {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("nama", item.nama);
    formData.append("qrcode", item.qrcode);
    formData.append("price", String(item.price));
    formData.append("supplier_id", item.supplier_id);
    formData.append("description", item.description);
    formData.append("discount", item.discount?.toString() || "");
    formData.append("category_id", item.category_id);
    if (item.image) {
      formData.append("image", item.image);
    }

    const response = await axios.post(`${backendBaseAPI}/api/items/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response.data);
  } catch (err) {
    console.error("Error creating an item : ", err);
  }
}

export { fetchItems, createItem };
