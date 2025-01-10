import { NextFunction, Request, Response, Router } from "express";
import { DB } from "../db/db";
import express from "express";
import InvoiceStore from "../services/purchaseOrderStore";
import InvoiceController from "../controller/purchaseOrderController";

const purchaseOrderRouter = (db: DB): Router => {
  const router = express.Router();
  const purchaseOrderStore = new InvoiceStore(db.getConn());
  const purchaseOrderController = new InvoiceController(purchaseOrderStore);

  router.get("/view", (req: Request, res: Response, next: NextFunction) => {
    purchaseOrderController.getPO(req, res, next);
  });

  router.post("/create", (req: Request, res: Response, next: NextFunction) => {
    purchaseOrderController.createPO(req, res, next);
  });

  router.delete("/delete", (req: Request, res: Response, next: NextFunction) => {
    purchaseOrderController.deletePO(req, res, next);
  });

  router.patch("/update", (req: Request, res: Response, next: NextFunction) => {
    purchaseOrderController.updatePO(req, res, next);
  });

  return router;
};

export default purchaseOrderRouter;
