import { IRecordSet, IResult } from "mssql";
import Admin from "../model/admin";
import BadRequestError from "../classes/BadReqError";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import Item from "../model/item";
import Category from "../model/category";
import exp from "constants";
import Inventory from "../model/inventory";
import Receipt from "../model/receipt";
import Tax from "../model/tax";
import ReturnItems from "../model/returnItems";
import PurchaseOrder from "../model/purchaseOrder";
import Supplier from "../model/supplier";

// interfaces
export interface AdminStoreInterface {
  getAllAdmin(): Promise<IRecordSet<Admin> | BadRequestError>;
  findAdmin(email: string): Promise<IRecordSet<Admin> | BadRequestError>;
  insertAdmin(admin: Admin): Promise<boolean | BadRequestError>;
  updateAdmin(admin: Admin): Promise<boolean | BadRequestError>;
  deleteAdmin(id: string): Promise<boolean | BadRequestError>;
}

export interface ItemStoreInterface {
  insertItem(item: Item): Promise<boolean | BadRequestError>;
  updateItem(updateValues: UpdateItemPayload): Promise<boolean | BadRequestError>;
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

export interface ReceiptStoreInterface {
  getReceipt(): Promise<IRecordSet<Receipt> | BadRequestError>;
  createReceipt(receipt: CreateReceiptPayload): Promise<boolean | BadRequestError>;
  deleteReceipt(payload: DeletePOReceiptPayload): Promise<boolean | BadRequestError>;
}

export interface TaxStoreInterface {
  createTax(tax: Tax): Promise<boolean | BadRequestError>;
  deleteTax(id: string): Promise<boolean | BadRequestError>;
  updateTax(updateValue: TaxPayload): Promise<boolean | BadRequestError>;
  getTaxes(): Promise<IRecordSet<Tax> | BadRequestError>;
}

export interface ReturnItemsInterface {
  getReturnItems(): Promise<IRecordSet<ReturnItems> | BadRequestError>;
  updateReturnItems(payload: UpdateReturnItemsPayload): Promise<boolean | BadRequestError>;
  deleteReturnItems(id: string): Promise<boolean | BadRequestError>;
}

export interface PurchaseOrderStoreInterface {
  createPO(payload: CreatePOPayload): Promise<boolean | BadRequestError>;
  deletePO(payload: DeletePOReceiptPayload): Promise<boolean | BadRequestError>;
  updatePO(payload: UpdatePOPayload): Promise<boolean | BadRequestError>;
  getPO(): Promise<IRecordSet<PurchaseOrder> | BadRequestError>;
}

export interface SupplierStoreInterface {
  createSupplier(payload: SupplierPayload): Promise<boolean | BadRequestError>;
  deleteSupplier(id: string): Promise<boolean | BadRequestError>;
  updateSupplier(payload: UpdateSupplierPayload): Promise<boolean | BadRequestError>;
  viewSupplier(): Promise<Supplier[] | BadRequestError>;
}

export type DeletePOReceiptPayload = {
  id: string;
  undo: 1 | 0;
};

export type UpdateSupplierPayload = {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
  country: string;
  city: string;
  postal_code: string | null;
};

export type SupplierPayload = {
  name: string;
  phone_number: string;
  email: string;
  address: string;
  country: string;
  city: string;
  postal_code: string | null;
};

export type CreatePOPayload = {
  payment_method: string;
  currency: string;
  total_subtotal: number;
  total_discount: number;
  total_tax: number;
  total_amount_due: number;
  items: [
    {
      item_id: string;
      quantity: number;
      unit_price: number;
      discount: number;
      exp_date: Date;
    }
  ];
  supplier_id: string;
  status: string;
};

export type UpdatePOPayload = {
  id: string;
  payment_method: string;
  currency: string;
  total_subtotal: number;
  total_discount: number;
  total_tax: number;
  total_amount_due: number;
  supplier_id: string;
  status: string;
};

export type UpdateReturnItemsPayload = {
  id: string;
  item_id?: string;
  quantity?: number;
  return_date?: Date;
  created_at?: Date;
};

export type TaxPayload = {
  id?: string;
  tax_rate: number;
  start_date: Date;
  end_date: Date;
};

export type CreateReceiptPayload = {
  payment_method: string;
  total_subtotal: number;
  total_discount: number;
  total_amount: number;
  tax_id: string;
  items: [
    {
      item_id: string;
      quantity: number;
    }
  ];
};

export type UpdateInventoryPayload = {
  id: number;
  quantity: number;
};

export type InsertInventoryPayload = {
  item_id: string;
  quantity: number;
  expired_date: Date;
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
  description: string;
  discount: number | null;
  image_url: string;
  category_id: string;
};

export type UpdateItemPayload = {
  id: string;
  nama?: string;
  qrcode?: string;
  price?: number;
  supplier_id?: string;
  description?: string;
  discount?: number | null;
  image_url?: string;
  category_id?: string;
};

export type SearchParameterPayload = {
  name: string;
  category_id: string;
  qrcode: string;
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
