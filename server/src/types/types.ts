import { IRecordSet, IResult } from "mssql";
import Admin from "../model/admin";
import BadRequestError from "../classes/BadReqError";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AdminStoreInterface {
  getAllAdmin(): Promise<IRecordSet<IAdmin> | BadRequestError>;
  findAdmin(email: string): Promise<IRecordSet<IAdmin> | BadRequestError>;
  insertAdmin(admin: Admin): Promise<boolean | BadRequestError>;
}

export interface ReqValidated extends Request {
  user: string | JwtPayload;
}

export type IAdmin = {
  id: string;
  name: string;
  password: string;
  email: string;
  phone_number: string;
};

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
