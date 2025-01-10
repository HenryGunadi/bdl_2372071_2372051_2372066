import React, { SetStateAction } from "react";
import { CreatePO, PO, UpdatePO } from "../types/types";
import axios from "axios";

const baseAPI = import.meta.env.VITE_BACKEND_API || "";

export async function viewPO(setPO: React.Dispatch<SetStateAction<PO[]>>) {
  try {
    const res = await axios.get<{ message: string; purchase_orders: PO[] }>(`${baseAPI}/api/purchase_order/view`, {
      withCredentials: true,
    });

    setPO(res.data.purchase_orders);
  } catch (err) {
    throw err;
  }
}

export async function createPO(PO: CreatePO) {
  try {
    const res = await axios.post(`${baseAPI}/api/purchase_order/create`, PO, {
      withCredentials: true,
    });

    console.log(res.data);
  } catch (err) {
    throw err;
  }
}

export async function updatePO(payload: UpdatePO) {
  try {
    const res = await axios.post(`${baseAPI}/api/purchase_order/update`, payload, {
      withCredentials: true,
    });

    console.log(res.data);
  } catch (err) {
    throw err;
  }
}

export async function deletePO(id: string) {
  try {
    const res = await axios.post(`${baseAPI}/api/purchase_order/delete?id=${id}`, {
      withCredentials: true,
    });

    console.log(res.data);
  } catch (err) {
    throw err;
  }
}
