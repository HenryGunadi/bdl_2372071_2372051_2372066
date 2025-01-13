import { NextFunction, Request, Response } from "express";
import BadRequestError from "../classes/BadReqError";
import { CreatePOPayload, DeletePOReceiptPayload, UpdatePOPayload } from "../types/types";
import PurchaseOrderDao from "../services/purchaseOrderDao";

class PurchaseOrderController {
  private _store: PurchaseOrderDao;

  constructor(store: PurchaseOrderDao) {
    this._store = store;
  }

  getPO = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.getPO();

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      return res.status(200).json({ message: "success", purchase_orders: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      return error;
    }
  };

  viewPODetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.viewPODetails();

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      return res.status(200).json({ message: "success", purchase_order_details: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      return error;
    }
  };

  createPO = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as CreatePOPayload;
      const queryRes = await this._store.createPO(payload);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are affected" } });
          return next(error);
        }

        return res.status(200).json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      return error;
    }
  };

  deletePO = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as DeletePOReceiptPayload;
      console.log("DELETE PAYLOAD : ", payload);
      const queryRes = await this._store.deletePO(payload);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are affected" } });
          return next(error);
        }

        return res.status(200).json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      return error;
    }
  };

  updatePO = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as UpdatePOPayload;
      const queryRes = await this._store.updatePO(payload);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      return res.status(200).json({ message: "success" });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      return error;
    }
  };
}

export default PurchaseOrderController;
