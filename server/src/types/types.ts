import { IRecordSet, IResult } from "mssql";
import Admin from "../model/admin";
import BadRequestError from "../classes/BadReqError";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import Item from "../model/item";

export interface AdminStoreInterface {
  getAllAdmin(): Promise<IRecordSet<Admin> | BadRequestError>;
  findAdmin(email: string): Promise<IRecordSet<Admin> | BadRequestError>;
  insertAdmin(admin: Admin): Promise<boolean | BadRequestError>;
}

export interface ItemStoreInterface {
  findItemByName(name: string): Promise<IRecordSet<Item> | BadRequestError>;
  insertItem(item: Item): Promise<boolean | BadRequestError>;
  updateItem(updateValues: CreateItemPayload): Promise<boolean | BadRequestError>;
  deleteItem(id: string): Promise<boolean | BadRequestError>;
  getItemByCategory(category: string): Promise<IRecordSet<Item> | BadRequestError>;
}

export interface ReqValidated extends Request {
  user: string | JwtPayload;
}

export type CustomErrorContent = {
  message: string;
  context?: { [key: string]: any };
};

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

export type DeleteItemPayload = {
  id: string;
};

export type FindItemByName = {
  name: string;
};

export type GetItemsByCategory = {
  category_id: string;
};
