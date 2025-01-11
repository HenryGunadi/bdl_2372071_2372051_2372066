import { NextFunction, Request, Response, Router } from "express";
import { DB } from "../db/db";
import express from "express";
import { CategoryStore } from "../services/categoryStore";
import { CategoryController } from "../controller/categoryController";

const categoryRouter = (db: DB): Router => {
  const router: Router = express.Router();
  const categoryStore: CategoryStore = new CategoryStore(db.getConn());
  const categoryController: CategoryController = new CategoryController(categoryStore);

  // get categories
  router.get("/view", (req: Request, res: Response, next: NextFunction) => {
    categoryController.getCategories(req, res, next);
  });

  // insert new category
  router.post("/insert", (req: Request, res: Response, next: NextFunction) => {
    categoryController.insertCategory(req, res, next);
  });

  return router;
};

export default categoryRouter;
