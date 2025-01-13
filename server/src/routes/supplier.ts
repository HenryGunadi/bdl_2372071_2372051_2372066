import { DB } from "../db/db";
import express, { NextFunction, Request, Response, Router } from "express";
import SupplierDao from "../services/supplierDao";
import SupplierController from "../controller/supplierController";

const supplierRouter = (db: DB): Router => {
  const router = express.Router();
  const supplierDao = new SupplierDao(db.getConn());
  const supplierController = new SupplierController(supplierDao);

  router.get("/view", (req: Request, res: Response, next: NextFunction) => {
    supplierController.viewSupplier(req, res, next);
  });

  router.post("/create", (req: Request, res: Response, next: NextFunction) => {
    supplierController.createSupplier(req, res, next);
  });

  router.patch("/update", (req: Request, res: Response, next: NextFunction) => {
    supplierController.updateSupplier(req, res, next);
  });

  router.delete("/delete", (req: Request, res: Response, next: NextFunction) => {
    supplierController.deleteSupplier(req, res, next);
  });

  return router;
};

export default supplierRouter;
