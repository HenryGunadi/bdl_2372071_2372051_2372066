import React, { SetStateAction } from "react";
import { Inventory, InventoryPayload } from "../types/types";
import axios from "axios";
import { backendBaseAPI } from "./Item";

export async function viewInventories(setInventories: React.Dispatch<SetStateAction<Inventory[]>>) {
  try {
    const res = await axios.get(`${backendBaseAPI}/api/inventory/view`, {
      withCredentials: true,
    });

    console.log(res.data.inventories);
    setInventories(res.data.inventories);
  } catch (err) {
    console.error(err);
  }
}

export async function updateInventory(payload: InventoryPayload) {
  try {
    const res = await axios.patch(`${backendBaseAPI}/api/inventory/update`, payload, {
      withCredentials: true,
    });

    console.log(res);
    alert("Inventory updated");
    window.location.reload(); // Refresh the page
  } catch (err) {
    console.error(err);
    alert(`Error updating inventory : ${err}`);
  }
}

export async function deleteInventory(itemID: string) {
  try {
    const res = await axios.delete(`${backendBaseAPI}/api/inventory/delete?id=${itemID}`, {
      withCredentials: true,
    });

    console.log(res);
    alert("Inventory deleted");
    window.location.reload(); // Refresh the page
  } catch (err) {
    console.error(err);
    alert(`Error updating inventory : ${err}`);
  }
}
