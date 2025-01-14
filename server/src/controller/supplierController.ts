import { NextFunction, Request, Response } from "express";
import SupplierStore from "../dao/supplierDao";
import BadRequestError from "../classes/BadReqError";
import { SupplierPayload, UpdateSupplierPayload } from "../types/types";

class SupplierController {
  private _store: SupplierStore;

  constructor(store: SupplierStore) {
    this._store = store;
  }

  viewSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.viewSupplier();

      return res.status(200).json({ message: "success", suppliers: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  createSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as SupplierPayload;
      const queryRes = await this._store.createSupplier(payload);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      if (!queryRes) {
        const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are created" } });
        return next(error);
      }

      return res.status(200).json({ message: "success" });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as UpdateSupplierPayload;
      const queryRes = await this._store.updateSupplier(payload);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      if (!queryRes) {
        const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are created" } });
        return next(error);
      }

      return res.status(200).json({ message: "success" });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.query as { id: string };

      if (!payload.id) {
        const error = new BadRequestError({ code: 400, message: "Supplier id is missing" });
        return next(error);
      }
      const queryRes = await this._store.deleteSupplier(payload.id);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      if (!queryRes) {
        const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are created" } });
        return next(error);
      }

      return res.status(200).json({ message: "success" });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };
}

export default SupplierController;
