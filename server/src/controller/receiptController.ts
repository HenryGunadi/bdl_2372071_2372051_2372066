import { NextFunction, Request, Response } from "express";
import ReceiptStore from "../services/receiptStore";
import BadRequestError from "../classes/BadReqError";
import { CreateReceiptPayload } from "../types/types";

class ReceiptController {
  private _store: ReceiptStore;

  constructor(store: ReceiptStore) {
    this._store = store;
  }

  createReceipt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as CreateReceiptPayload;
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
}

export default ReceiptController;
