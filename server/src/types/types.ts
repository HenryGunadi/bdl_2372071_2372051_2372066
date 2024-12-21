import { IRecordSet, IResult } from "mssql";
import Admin from "../model/admin";
import BadRequestError from "../classes/BadReqError";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import Item from "../model/item";
import Category from "../model/category";
import exp from "constants";
import Inventory from "../model/inventory";

// interfaces
export interface AdminStoreInterface {
  getAllAdmin(): Promise<IRecordSet<Admin> | BadRequestError>;
  findAdmin(email: string): Promise<IRecordSet<Admin> | BadRequestError>;
  insertAdmin(admin: Admin): Promise<boolean | BadRequestError>;
}

export interface ItemStoreInterface {
  insertItem(item: Item): Promise<boolean | BadRequestError>;
  updateItem(updateValues: CreateItemPayload): Promise<boolean | BadRequestError>;
  deleteItem(id: string): Promise<boolean | BadRequestError>;
  getItems(searchParameter: SearchParameterPayload): Promise<IRecordSet<Item> | BadRequestError>;
}

export interface CategoryStoreInterface {
  getAllCategories(): Promise<IRecordSet<Category> | BadRequestError>;
  deleteCategory(category_id: string): Promise<boolean | BadRequestError>;
  insertCategory(category: Category): Promise<boolean | BadRequestError>;
  getCategoryByName(category_name: string): Promise<IRecordSet<Category> | BadRequestError>;
  updateCategory(updated_category: UpdateCategoryPayload): Promise<boolean | BadRequestError>;
}

export interface InventoryStoreInterface {
  getInventories(): Promise<IRecordSet<ViewInventory> | BadRequestError>;
  updateInventory(value: UpdateInventoryPayload): Promise<boolean | BadRequestError>;
  insertInventory(inventory: Inventory): Promise<boolean | BadRequestError>;
  deleteInventory(id: number): Promise<boolean | BadRequestError>;
}

export type UpdateInventoryPayload = {
  id: number;
  quantity: number;
};

export type InsertInventoryPayload = {
  item_id: string;
  quantity: number;
};

export type ViewInventory = {
  inventory_id: number;
  item_id: string;
  quantity: number;
  last_updated: Date;
  nama: string;
  image_url: string;
};

export interface ReqValidated extends Request {
  user: string | JwtPayload;
}

export type CustomErrorContent = {
  message: string;
  context?: { [key: string]: any };
};

// auth route
export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

// item route
export type CreateItemPayload = {
  nama: string;
  qrcode: string;
  price: number;
  supplier_id: string;
  expired_date: Date;
  description: string;
  discount: number;
  image_url: string;
  category_id: string;
};

export type SearchParameterPayload = {
  name: string;
  category_id: string;
  qrcode: string;
};

export type DeleteItemPayload = {
  id: string;
};

export type FindItemByName = {
  name: string;
};

export type GetItemsByCategory = {
  category_id: string;
};

export type CategoryPayload = {
  category_name: string;
};

export type UpdateCategoryPayload = {
  id: number;
  category_name: string;
};
