import e, { NextFunction, query, Request, Response } from "express";
import AdminStore from "../services/adminStore";
import { LoginPayload, RegisterPayload } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Admin from "../model/admin";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AdminController {
  private _store: AdminStore;

  constructor(store: AdminStore) {
    this._store = store;
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as RegisterPayload;
      const response = await this._store.findAdmin(payload.email);

      // check if there is internal server error
      if (response instanceof BadRequestError) {
        return next(response);
      } else {
        // if admin exists
        if (response.length != 0) {
          console.log("Admin already exists");
          const error = new BadRequestError({ code: 400, message: "Admin already exists." });
          return next(error);
        }
      }

      // create hash password
      const hashedPass = await bcrypt.hash(payload.password, 10);

      // register new admin
      const newAdmin = new Admin("1", payload.name, hashedPass, payload.email, payload.phone_number);
      const insertRes = await this._store.insertAdmin(newAdmin);

      // Internal Server Error
      if (insertRes instanceof BadRequestError) {
        return next(insertRes);
      }

      // no rows affected
      if (!insertRes) {
        const error = new BadRequestError({ code: 500, message: "Something went wrong" });
        return next(error);
      }

      // register success
      return res.status(201).setHeader("Content-Type", "application/json").json({ message: "Register success" });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: `Internal server error : ${err}` });
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as LoginPayload;
      const queryRes = await this._store.findAdmin(payload.email);

      // check if there is internal server errror in querying
      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        // check if admin doesnt exists
        if (queryRes.length == 0) {
          const error = new BadRequestError({ code: 400, message: "Admin doesnt exists." });
          return next(error);
        }

        // check password
        const passMatch = await bcrypt.compare(payload.password, queryRes[0].password);
        if (!passMatch) {
          const error = new BadRequestError({ code: 400, message: "Invalid password" });
          return next(error);
        }

        // create jwt token and sign the admin with secret key
        const adminTokenPayload = {
          adminID: queryRes[0].id,
        };
        const token = jwt.sign(adminTokenPayload, "testing-secret-key", { expiresIn: "1h" });

        return res.status(200).setHeader("Content-Type", "application/json").json({ message: "Login successful", token: token });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: `Internal server error : ${err}` });
      next(error);
    }
  };
}

export default AdminController;
