import { NextFunction, Request, Response } from "express";
import ReceiptStore from "../services/receiptDao";
import BadRequestError from "../classes/BadReqError";
import { CreateReceiptPayload, DeletePOReceiptPayload } from "../types/types";

class ReceiptController {
  private _store: ReceiptStore;

  constructor(store: ReceiptStore) {
    this._store = store;
  }

  createReceipt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as CreateReceiptPayload;
      console.log("RECEIPT FROM BACKEND : ", payload);
      const queryRes = await this._store.createReceipt(payload);

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
      next(error);
    }
  };

  deleteReceipt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as DeletePOReceiptPayload;
      console.log("DELETE RECEIPT PAYLOAD BACKEDN : ", payload);
      const queryRes = await this._store.deleteReceipt(payload);

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
      next(error);
    }
  };

  getReceipts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.getReceipt();

      return res.status(200).json({ message: "success", receipts: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  getReceiptDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.getReceiptDetails();

      return res.status(200).json({ message: "success", receipts: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };
}

export default ReceiptController;
