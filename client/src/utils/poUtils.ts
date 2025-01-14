import React, { SetStateAction } from "react";
import { CreatePO, PO, PODetails, UpdatePO } from "../types/types";
import axios from "axios";

const baseAPI = import.meta.env.VITE_BACKEND_API || "";

export async function viewPO(setPO: React.Dispatch<SetStateAction<PO[]>>) {
  try {
    const res = await axios.get<{ message: string; purchase_orders: PO[] }>(`${baseAPI}/api/purchase_order/view`, {
      withCredentials: true,
    });

    console.log("VIEW PO DETAILS : ", res.data);
    setPO(res.data.purchase_orders);
  } catch (err) {
    throw err;
  }
}

export async function viewPODetails(setPO: React.Dispatch<SetStateAction<PODetails[]>>) {
  try {
    const res = await axios.get<{ message: string; purchase_order_details: PODetails[] }>(`${baseAPI}/api/purchase_order/view_details`, {
      withCredentials: true,
    });

    console.log("VIEW PO DETAILS : ", res.data);
    setPO(res.data.purchase_order_details);
  } catch (err) {
    throw err;
  }
}

export async function createPO(PO: CreatePO) {
  try {
    console.log("PO CREATE FRONTEND : ", PO);
    const res = await axios.post(`${baseAPI}/api/purchase_order/create`, PO, {
      withCredentials: true,
    });

    console.log(res.data);
    alert("Purchase order created");
    window.location.reload(); // Refresh the page
  } catch (err) {
    throw err;
  }
}

export async function updatePO(payload: UpdatePO) {
  try {
    const res = await axios.patch(`${baseAPI}/api/purchase_order/update`, payload, {
      withCredentials: true,
    });

    console.log(res.data);
  } catch (err) {
    throw err;
  }
}

export async function deletePO(id: string) {
  try {
    const deletePayload = {
      id: id,
      undo: 0,
    };

    const res = await axios.post(`${baseAPI}/api/purchase_order/delete`, deletePayload, {
      withCredentials: true,
    });

    console.log(res.data);
  } catch (err) {
    console.error(err);
    alert(`Error deleting PO : ${err}`);
  }
}
