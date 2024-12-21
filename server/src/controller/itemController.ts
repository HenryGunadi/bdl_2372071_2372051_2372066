import { NextFunction, Request, Response } from "express";
import { ItemStore } from "../services/itemStore";
import BadRequestError from "../classes/BadReqError";
import { CreateItemPayload, DeleteItemPayload, FindItemByName, GetItemsByCategory, SearchParameterPayload } from "../types/types";
import Item from "../model/item";

// NOTE : Still confused on how to identify unique item when inserting

class ItemController {
  private _store: ItemStore;

  constructor(store: ItemStore) {
    this._store = store;
  }

  // FIX
  insertItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as CreateItemPayload;

      // create new item
      const newItem = new Item(payload.nama, payload.qrcode, payload.price, payload.supplier_id, payload.expired_date, payload.description, payload.discount, payload.image_url, payload.category_id);

      const queryRes = await this._store.insertItem(newItem);

      // check if there is internal server error
      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        // check if no rows are affected
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are affected" } });
          next(error);
        }

        return res.status(200).setHeader("Content-Type", "application/json").json({ message: "The item has been created successfully" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as DeleteItemPayload;

      const queryRes = await this._store.deleteItem(payload.id);

      // check if there is internal server error
      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        // check if no rows are affected
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are affected" } });
          next(error);
        }

        return res.status(200).setHeader("Content-Type", "application/json").json({ message: "The item has been deleted" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  getItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, category_id, qrcode } = req.query as SearchParameterPayload;

      const searchParams: SearchParameterPayload = {
        name: name || "",
        category_id: category_id || "",
        qrcode: qrcode || "",
      };

      const queryRes = await this._store.getItems(searchParams);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      res.status(200).setHeader("Content-Type", "application/json").json({ message: "success", items: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { erorr: `${err}` } });
      next(error);
    }
  };
}

export default ItemController;
