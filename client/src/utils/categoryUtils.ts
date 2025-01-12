import axios from "axios";
import { SetStateAction } from "react";
import { Category, CategoryPayload, UpdateCategory } from "../types/types";
import { backendBaseAPI } from "./Item";

export const viewCategories = async (setCategories: React.Dispatch<SetStateAction<Category[]>>) => {
  try {
    const res = await axios.get(`${backendBaseAPI}/api/category/view`, {
      withCredentials: true,
    });

    setCategories(res.data.categories);
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

export const createCategory = async (payload: CategoryPayload) => {
  try {
    const res = await axios.post(`${backendBaseAPI}/api/category/create`, payload, {
      withCredentials: true,
    });

    console.log(res.data);
    alert("Category created");
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const res = await axios.delete(`${backendBaseAPI}/api/category/delete?id=${String(id)}`, {
      withCredentials: true,
    });

    console.log(res.data);
    alert("Category deleted");
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const updateCategories = async (payload: UpdateCategory) => {
  try {
    console.log("Update category payload : ", payload);
    const res = await axios.patch(`${backendBaseAPI}/api/category/update`, payload, {
      withCredentials: true,
    });

    console.log(res.data);
    alert("Category updated");
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};
