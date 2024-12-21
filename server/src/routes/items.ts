import { NextFunction, Request, Response, Router } from "express";
import express from "express";
import { DB } from "../db/db";
import ItemController from "../controller/itemController";
import { ItemStore } from "../services/itemStore";
import { insertItemValidator } from "../validators/itemValidator";

const itemsAuth = (db: DB): Router => {
  const router = express.Router();
  const itemStore = new ItemStore(db.getConn());
  const itemController = new ItemController(itemStore);

  // add items
  router.post("/", insertItemValidator, (req: Request, res: Response, next: NextFunction) => {});

  return router;
};

export default itemsAuth;
