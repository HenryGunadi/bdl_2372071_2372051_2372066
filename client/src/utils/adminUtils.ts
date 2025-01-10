import React, { SetStateAction } from "react";
import { Admin, AdminPayload, CreateAdmin } from "../types/types";
import axios from "axios";

const baseAPI = import.meta.env.VITE_BACKEND_API || "";

export async function viewAdmin(setAdmins: React.Dispatch<SetStateAction<Admin[]>>) {
  try {
    const res = await axios.get<{ admins: Admin[] }>(`${baseAPI}/api/admin/view`, {
      withCredentials: true,
    });

    console.log(res.data.admins);
    setAdmins(res.data.admins);
  } catch (err) {
    console.error(err);
  }
}

export async function createAdmin(admin: CreateAdmin) {
  try {
    const res = await axios.post(`${baseAPI}/api/admin/create`, admin, {
      withCredentials: true,
    });

    console.log(res.data);
    if (res.status === 400) {
      alert("Error, incorrect submission fields.");
    }
  } catch (err) {
    console.error(err);
  }
}

export async function updateAdmin(payload: AdminPayload) {
  try {
    const res = await axios.patch(`${baseAPI}/api/admin/update`, payload, {
      withCredentials: true,
    });

    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteAdmin(adminID: string) {
  try {
    const res = await axios.delete(`${baseAPI}/api/admin/delete?id=${adminID}`, {
      withCredentials: true,
    });

    if (res.status === 400) {
      alert("Admin does not exist.");
    }
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}
