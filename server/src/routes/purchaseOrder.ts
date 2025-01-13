import { NextFunction, Request, Response, Router } from "express";
import { DB } from "../db/db";
import express from "express";
import PurchaseOrderDao from "../services/purchaseOrderDao";
import PurchaseOrderController from "../controller/purchaseOrderController";

const purchaseOrderRouter = (db: DB): Router => {
  const router = express.Router();
  const purchaseOrderDao = new PurchaseOrderDao(db.getConn());
  const purchaseOrderController = new PurchaseOrderController(purchaseOrderDao);

  router.get("/view", (req: Request, res: Response, next: NextFunction) => {
    purchaseOrderController.getPO(req, res, next);
  });

  router.get("/view_details", (req: Request, res: Response, next: NextFunction) => {
    purchaseOrderController.viewPODetails(req, res, next);
  });

  router.post("/create", (req: Request, res: Response, next: NextFunction) => {
    purchaseOrderController.createPO(req, res, next);
  });

  router.post("/delete", (req: Request, res: Response, next: NextFunction) => {
    purchaseOrderController.deletePO(req, res, next);
  });

  router.patch("/update", (req: Request, res: Response, next: NextFunction) => {
    purchaseOrderController.updatePO(req, res, next);
  });

  return router;
};

export default purchaseOrderRouter;
