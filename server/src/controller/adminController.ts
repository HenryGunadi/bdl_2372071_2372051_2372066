import e, { NextFunction, query, Request, Response } from "express";
import AdminStore from "../dao/adminDao";
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

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as LoginPayload;
      const queryRes = await this._store.findAdmin(payload.email);

      if (queryRes instanceof BadRequestError) {
        const error = new BadRequestError({ code: 500, message: `Something went wrong in login` });
        return next(error);
      }

      // Check if admin exists
      if (!queryRes) {
        const error = new BadRequestError({ code: 400, message: "Admin doesn't exist." });
        return next(error);
      }

      // Check password
      const passMatch = await bcrypt.compare(payload.password, queryRes.password);
      if (!passMatch) {
        const error = new BadRequestError({ code: 400, message: "Invalid password" });
        return next(error);
      }

      // Create JWT token with user's role
      const adminTokenPayload = {
        adminID: queryRes.id,
        role: queryRes.role,
      };

      const token = jwt.sign(adminTokenPayload, "testing-secret-key", { expiresIn: "1h" });

      return res.status(200).setHeader("Content-Type", "application/json").json({
        message: "Login successful",
        token: token,
        role: queryRes.role, // Return role in response
      });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: `Internal server error: ${err}` });
      next(error);
    }
  };

  createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as Admin;
      const newAdmin = new Admin(payload.name, payload.password, payload.email, payload.phone_number, payload.role);
      const queryRes = await this._store.insertAdmin(newAdmin);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      if (!queryRes) {
        const error = new BadRequestError({ code: 500, message: "Something went wrong.", context: { error: "No rows are created" } });
        return next(error);
      }

      res.status(200).json({ message: "success" });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: `Internal server error : ${err}` });
      next(error);
    }
  };

  updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as Admin;
      const updatedAdmin = new Admin(payload.name, payload.password, payload.email, payload.phone_number, payload.role);
      const queryRes = await this._store.updateAdmin(payload);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      if (!queryRes) {
        const error = new BadRequestError({ code: 500, message: "Something went wrong.", context: { error: "No rows are created" } });
        return next(error);
      }

      res.status(200).json({ message: "success" });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: `Internal server error : ${err}` });
      next(error);
    }
  };

  deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.query as { id: string };
      const queryRes = await this._store.deleteAdmin(payload.id);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      if (!queryRes) {
        const error = new BadRequestError({ code: 500, message: "Something went wrong.", context: { error: "No rows are created" } });
        return next(error);
      }

      res.status(200).json({ message: "success" });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: `Internal server error : ${err}` });
      next(error);
    }
  };

  viewAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.getAllAdmin();

      return res.status(200).json({ admins: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: `Internal server error : ${err}` });
      next(error);
    }
  };
}

export default AdminController;
