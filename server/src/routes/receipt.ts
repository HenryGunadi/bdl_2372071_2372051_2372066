import { NextFunction, Request, Response, Router } from "express";
import { DB } from "../db/db";
import express from "express";
import { createTaxValidator } from "../validators/taxValidator";
import { validationResult } from "express-validator";
import BadRequestError from "../classes/BadReqError";
import ReceiptStore from "../services/receiptStore";
import ReceiptController from "../controller/receiptController";

const receiptRouter = (db: DB): Router => {
  const router = express.Router();
  const receiptStore = new ReceiptStore(db.getConn());
  const receiptController = new ReceiptController(receiptStore);

  router.post("/create", (req: Request, res: Response, next: NextFunction) => {
    receiptController.createReceipt(req, res, next);
  });

  return router;
};

export default receiptRouter;
