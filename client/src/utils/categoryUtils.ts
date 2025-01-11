import axios from "axios";
import { SetStateAction } from "react";
import { Category } from "../types/types";
import { backendBaseAPI } from "./Item";

export const viewCategories = async (setCategories: React.Dispatch<SetStateAction<Category[]>>) => {
  try {
    const res = await axios.get(`${backendBaseAPI}/api/category/view`, {
      withCredentials: true,
    });

    setCategories(res.data.categories);
  } catch (err) {
    console.error(err);
  }
};
