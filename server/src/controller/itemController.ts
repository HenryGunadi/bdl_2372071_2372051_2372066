import { NextFunction, Request, Response } from "express";
import { ItemDao } from "../services/itemDao";
import BadRequestError from "../classes/BadReqError";
import { CreateItemPayload, FindItemByName, GetItemsByCategory, UpdateItemPayload } from "../types/types";
import Item from "../model/item";
import multer from "multer";

// NOTE : Still confused on how to identify unique item when inserting

class ItemController {
  private _store: ItemDao;

  constructor(store: ItemDao) {
    this._store = store;
  }

  insertItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: CreateItemPayload = req.body;

      console.log("PAYLOAD FROM FORMDATA? : ");

      const imageURL = req.file ? req.file.path : "";
      const formattedImageURL = imageURL.split("\\").pop() || "";

      console.log("IMAGE URL : ", formattedImageURL);

      // create new item
      const newItem = new Item(payload.nama, payload.qrcode, payload.price, payload.supplier_id, payload.description, formattedImageURL, payload.category_id, payload.discount);

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

        return res.status(200).json({ message: "The item has been created successfully" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.query as { id: string };
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

        return res.status(200).json({ message: "The item has been deleted" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  viewItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.viewItems();

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      res.status(200).json({ message: "success", items: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { erorr: `${err}` } });
      next(error);
    }
  };

  updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: UpdateItemPayload = req.body;

      console.log("UPDATE PAYLOAD FROM FORMDATA? : ");

      const imageURL = req.file ? req.file.path : "";
      const formattedImageURL = imageURL.split("\\").pop() || "";

      console.log("IMAGE URL : ", formattedImageURL);

      payload.image_url = formattedImageURL;
      const queryRes = await this._store.updateItem(payload);

      // check if there is internal server error
      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        // check if no rows are affected
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are affected" } });
          next(error);
        }

        return res.status(200).json({ message: "The item has been updated successfully" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };
}

export default ItemController;
