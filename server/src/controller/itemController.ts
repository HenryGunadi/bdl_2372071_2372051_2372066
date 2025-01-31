import { NextFunction, Request, Response } from "express";
import { ItemDao } from "../dao/itemDao";
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
      console.log("PAYLOAD FROM FORMDATA? : ", payload);

      const imageURL = req.file ? req.file.path : "";
      const formattedImageURL = imageURL.split("\\").pop() || "";

      console.log("IMAGE URL : ", formattedImageURL);

      console.log("TESTING TEST TYPE BUY_PRICE : ", payload.buy_price);

      // create new item
      const newItem = new Item(payload.nama, parseFloat(payload.price), payload.supplier_id, payload.description, formattedImageURL, parseFloat(payload.category_id), parseFloat(payload.discount), parseFloat(payload.buy_price));

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
      let image: string | null = "";
      console.log("UPDATE PAYLOAD FROM FORMDATA? : ", payload);

      const imageURL = req.file ? req.file.path : ""; // if there is file
      const formattedImageURL = imageURL.split("\\").pop() || "";
      console.log("IMAGE URL : ", formattedImageURL);
      image = formattedImageURL;

      if (imageURL === "") {
        image = null;
      }

      if (payload.image === "erased") {
        image = "";
      }

      const UpdatedItem: Item = new Item(payload.nama, payload.price, payload.supplier_id, payload.description, image, payload.category_id, payload.discount, payload.buy_price, payload.id);

      const queryRes = await this._store.updateItem(UpdatedItem);

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
