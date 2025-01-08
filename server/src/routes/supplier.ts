import { DB } from "../db/db";
import express, { NextFunction, Request, Response, Router } from "express";
import SupplierStore from "../services/supplierStore";
import SupplierController from "../controller/supplierController";

const supplierRouter = (db: DB): Router => {
  const router = express.Router();
  const supplierStore = new SupplierStore(db.getConn());
  const supplierController = new SupplierController(supplierStore);

  router.get("/view", (req: Request, res: Response, next: NextFunction) => {
    supplierController.viewSupplier(req, res, next);
  });

  router.post("/create", (req: Request, res: Response, next: NextFunction) => {
    supplierController.viewSupplier(req, res, next);
  });

  router.patch("/update", (req: Request, res: Response, next: NextFunction) => {
    supplierController.viewSupplier(req, res, next);
  });

  router.delete("/delete", (req: Request, res: Response, next: NextFunction) => {
    supplierController.viewSupplier(req, res, next);
  });

  return router;
};

export default supplierRouter;
