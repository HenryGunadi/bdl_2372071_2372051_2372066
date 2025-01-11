import { NextFunction, query, Request, Response } from "express";
import InventoryStore from "../services/inventoryStore";
import BadRequestError from "../classes/BadReqError";
import Inventory from "../model/inventory";
import { InsertInventoryPayload, UpdateInventoryPayload } from "../types/types";

class InventoryController {
  private _store: InventoryStore;

  constructor(store: InventoryStore) {
    this._store = store;
  }

  getInventories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.getInventories();

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      return res.status(200).json({ message: "success", inventories: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  insertInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as InsertInventoryPayload;
      const newInventory = new Inventory(payload.item_id, payload.quantity, payload.expired_date);

      const queryRes = await this._store.insertInventory(newInventory);

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

  updateInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as UpdateInventoryPayload;
      console.log("INVENT PAYLOAD BACKEND : ", payload);

      const queryRes = await this._store.updateInventory(payload);

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

  deleteInventory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.query as { id: string };
      const queryRes = await this._store.deleteInventory(payload.id);

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

export default InventoryController;
