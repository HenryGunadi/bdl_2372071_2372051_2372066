import { NextFunction, Request, Response } from "express";
import ReturnItemsStore from "../services/returnItemsStore";
import BadRequestError from "../classes/BadReqError";
import { UpdateReturnItemsPayload } from "../types/types";

class ReturnItemsController {
  private _store: ReturnItemsStore;

  constructor(store: ReturnItemsStore) {
    this._store = store;
  }

  getReturnItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.getReturnItems();

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      return res.status(200).json({ message: "success", return_items: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  updateReturnItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as UpdateReturnItemsPayload;
      const queryRes = await this._store.updateReturnItems(payload);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: `No rows are affected` } });
          return next(queryRes);
        }

        return res.status(200).json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  deleteReturnItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.query as { id: string };
      const queryRes = await this._store.deleteReturnItems(payload.id);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: `No rows are affected` } });
          return next(queryRes);
        }

        return res.status(200).json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };
}

export default ReturnItemsController;
