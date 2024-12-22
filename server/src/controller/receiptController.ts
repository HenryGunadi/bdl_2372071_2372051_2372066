import { NextFunction, Request, Response } from "express";
import ReceiptStore from "../services/receiptStore";
import BadRequestError from "../classes/BadReqError";

class ReceiptController {
  private _store: ReceiptStore;

  constructor(store: ReceiptStore) {
    this._store = store;
  }

  createReceipt = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };
}

export default ReceiptController;
