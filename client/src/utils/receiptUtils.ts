import React, { SetStateAction } from "react";
import { CreateReceiptPayload, DeleteReceiptPayload, Receipt, ReceiptDetail } from "../types/types";
import axios from "axios";
import { backendBaseAPI } from "./Item";

export async function viewReceipt(setState: React.Dispatch<SetStateAction<Receipt[]>>) {
  try {
    const res = await axios.get(`${backendBaseAPI}/api/receipt/view`, {
      withCredentials: true,
    });

    console.log(res.data);
    setState(res.data.receipts);
  } catch (err) {
    console.error(err);
  }
}

export async function viewReceiptDetails(setState: React.Dispatch<SetStateAction<ReceiptDetail[]>>) {
  try {
    const res = await axios.get(`${backendBaseAPI}/api/receipt/view_details`, {
      withCredentials: true,
    });

    console.log("RECEIPT DETAILS : ", res.data);
    setState(res.data.receipts);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteReceipt(payload: DeleteReceiptPayload) {
  try {
    console.log("DELETE RECEIPT PAYLOAD FRONTEND : ", payload);
    const res = await axios.post(`${backendBaseAPI}/api/receipt/delete`, payload, {
      withCredentials: true,
    });

    console.log(res.data);
    alert("Receipt deleted");
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert(`Error delete receipt : ${err}`);
  }
}

export async function createReceipt(payload: CreateReceiptPayload) {
  try {
    const res = await axios.post(`${backendBaseAPI}/api/receipt/create`, payload, {
      withCredentials: true,
    });

    console.log(res.data);
    alert("Receipt created");
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert(`Create receipt error : ${err}`);
  }
}
