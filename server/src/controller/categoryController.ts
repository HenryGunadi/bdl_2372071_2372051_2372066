import { NextFunction, query, Request, Response } from "express";
import { CategoryStore } from "../services/categoryStore";
import BadRequestError from "../classes/BadReqError";
import { IRecordSet } from "mssql";
import Category from "../model/category";

export class CategoryController {
  private _store: CategoryStore;

  constructor(store: CategoryStore) {
    this._store = store;
  }

  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let queryRes;

      // check if user search by name
      const { name } = req.query;

      if (name) {
        queryRes = await this._store.getCategoryByName(name as string);

        if (queryRes instanceof BadRequestError) {
          return next(queryRes);
        }
      } else {
        queryRes = await this._store.getAllCategories();

        if (queryRes instanceof BadRequestError) {
          return next(queryRes);
        }
      }

      return res.status(200).setHeader("Content-Type", "application/json").json({ message: "success", categories: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { erorr: `${err}` } });
      next(error);
    }
  };
}
