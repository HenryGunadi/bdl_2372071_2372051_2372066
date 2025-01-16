import { SetStateAction } from "react";
import { Tax, TaxPayload } from "../types/types";
import axios from "axios";
import { backendBaseAPI } from "./Item";

export async function viewTax(setState: React.Dispatch<SetStateAction<Tax[]>>) {
  try {
    const res = await axios.get(`${backendBaseAPI}/api/tax/view`, {
      withCredentials: true,
    });

    console.log(res.data);
    setState(res.data.taxes);
  } catch (err) {
    console.error(err);
  }
}

export async function createTax(payload: TaxPayload) {
  try {
    payload.tax_rate = payload.tax_rate * 0.01 
    const res = await axios.post(`${backendBaseAPI}/api/tax/create`, payload, {
      withCredentials: true,
    });

    console.log(res.data);
    alert("Tax created");
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
}

export async function updateTax(payload: TaxPayload) {
  try {
    const res = await axios.put(`${backendBaseAPI}/api/tax/update`, payload, {
      withCredentials: true,
    });

    console.log(res.data);
    alert("Tax updated");
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert(`Error updating category : ${err}`)
  }
}

export async function deleteTax(id: string) {
  try {
    const res = await axios.delete(`${backendBaseAPI}/api/tax/delete?id=${id}`, {
      withCredentials: true,
    });

    console.log(res.data);
    alert("Tax deleted");
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
}
