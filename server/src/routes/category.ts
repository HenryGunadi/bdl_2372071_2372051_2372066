import { NextFunction, Request, Response, Router } from "express";
import { DB } from "../db/db";
import express from "express";
import { CategoryDao } from "../dao/categoryDao";
import { CategoryController } from "../controller/categoryController";

const categoryRouter = (db: DB): Router => {
  const router: Router = express.Router();
  const categoryDao: CategoryDao = new CategoryDao(db.getConn());
  const categoryController: CategoryController = new CategoryController(categoryDao);

  // get categories
  router.get("/view", (req: Request, res: Response, next: NextFunction) => {
    categoryController.getCategories(req, res, next);
  });

  router.post("/create", (req: Request, res: Response, next: NextFunction) => {
    categoryController.insertCategory(req, res, next);
  });

  router.patch("/update", (req: Request, res: Response, next: NextFunction) => {
    categoryController.updateCategory(req, res, next);
  });

  router.delete("/delete", (req: Request, res: Response, next: NextFunction) => {
    categoryController.deleteCategory(req, res, next);
  });

  return router;
};

export default categoryRouter;
