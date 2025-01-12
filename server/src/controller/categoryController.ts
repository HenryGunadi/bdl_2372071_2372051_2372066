import { NextFunction, query, Request, Response } from "express";
import { CategoryStore } from "../services/categoryStore";
import BadRequestError from "../classes/BadReqError";
import Category from "../model/category";
import { CategoryPayload, UpdateCategoryPayload } from "../types/types";

export class CategoryController {
  private _store: CategoryStore;

  constructor(store: CategoryStore) {
    this._store = store;
  }

  getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let queryRes;

      // check if client pass arg search name in the query url
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

  insertCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as CategoryPayload;
      const newCategory = new Category(payload.category_name);

      const queryRes = await this._store.insertCategory(newCategory);

      // check if there is internal server error when querying
      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        // check if any rows are affected
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "Error inserting new category" } });
          return next(error);
        }

        return res.status(200).setHeader("Content-Type", "application/json").json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as UpdateCategoryPayload;

      const queryRes = await this._store.updateCategory(payload);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are affected" } });
          return next(error);
        }

        return res.status(200).setHeader("Content-Type", "application/json").json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as { id: string };

      const queryRes = await this._store.deleteCategory(parseInt(query.id));

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Something went wrong", context: { error: "No rows are affected" } });
          return next(error);
        }

        return res.status(200).setHeader("Content-Type", "application/json").json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };
}
