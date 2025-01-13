import { NextFunction, Request, Response, Router } from "express";
import { DB } from "../db/db";
import express from "express";
import InventoryDao from "../services/inventoryDao";
import InventoryController from "../controller/inventoryController";

const inventoryRouter = (db: DB): Router => {
  const router = express.Router();
  const inventoryDao = new InventoryDao(db.getConn());
  const inventoryController = new InventoryController(inventoryDao);

  router.get("/view", (req: Request, res: Response, next: NextFunction) => {
    inventoryController.getInventories(req, res, next);
  });

  router.patch("/update", (req: Request, res: Response, next: NextFunction) => {
    inventoryController.updateInventory(req, res, next);
  });

  router.delete("/delete", (req: Request, res: Response, next: NextFunction) => {
    inventoryController.deleteInventory(req, res, next);
  });

  return router;
};

export default inventoryRouter;
