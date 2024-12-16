import { NextFunction, Request, Response } from "express";
import AdminStore from "../services/adminStore";
import { RegisterPayload } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Admin from "../model/admin";

class AdminController {
  private _store: AdminStore;

  constructor(store: AdminStore) {
    this._store = store;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err) {
      console.error("Error login");
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body() as RegisterPayload;
      const response = await this._store.findAdmin(payload.email);

      // check if there is internal server error
      if (response instanceof BadRequestError) {
        next(response);
      } else {
        // if admin exists
        if (response.length != 0) {
          console.log("Admin already exists");
          const error = new BadRequestError({ code: 400, message: "Admin already exists." });
          next(error);
        }
      }

      // register new admin
      const newAdmin = new Admin("1", payload.name, payload.password, payload.email, payload.phone_number);
      const insertRes = await this._store.insertAdmin(newAdmin);

      // Internal Server Error
      if (insertRes instanceof BadRequestError) {
        next(insertRes);
      }

      // no rows affected
      if (!insertRes) {
        const error = new BadRequestError({ code: 500, message: "Internal server error" });
        next(error);
      }

      // register success
      return res.status(201).json({ message: "Register success." });
    } catch (err) {
      console.error("Register error : ", err);
    }
  };
}

export default AdminController;
