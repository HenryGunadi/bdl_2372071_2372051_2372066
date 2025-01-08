import axios from "axios";
import React, { SetStateAction } from "react";
import { Supplier, SupplierPayload } from "../types/types";

const baseAPI: string = import.meta.env.VITE_BACKEND_API || "";

export async function viewSupplier(setSupplier: React.Dispatch<SetStateAction<Supplier[]>>) {
  try {
    const res = await axios.get(`${baseAPI}/api/supplier/view`, {
      withCredentials: true,
    });

    setSupplier(res.data.suppliers);
    console.log(res.data.suppliers);
  } catch (err) {
    console.error("Error getting suppliers : ", err);
  }
}

export async function createSupplier(supplier: SupplierPayload) {
  try {
    const res = await axios.post(`${baseAPI}/api/supplier/create`, supplier, {
      withCredentials: true,
    });

    console.log(res.data);
  } catch (err) {
    console.error("Error creating supplier : ", err);
  }
}

export async function updateSupplier(supplier: SupplierPayload) {
  try {
    const res = await axios.post(`${baseAPI}/api/supplier/update`, supplier, {
      withCredentials: true,
    });

    console.log(res.data);
  } catch (err) {
    console.error("Error creating supplier : ", err);
  }
}

export async function deleteSupplier(id: string) {
  try {
    const res = await axios.post(`${baseAPI}/api/supplier/delete?id=${id}`, {
      withCredentials: true,
    });

    console.log(res.data);
  } catch (err) {
    console.error("Error creating supplier : ", err);
  }
}
