import { NextFunction, Request, Response, Router } from "express";
import { DB } from "../db/db";
import express from "express";
import { validationResult } from "express-validator";
import BadRequestError from "../classes/BadReqError";
import ReceiptStore from "../services/receiptStore";
import ReceiptController from "../controller/receiptController";
import { createReceiptValidator, deleteReceiptValidator } from "../validators/receiptValidator";

const receiptRouter = (db: DB): Router => {
  const router = express.Router();
  const receiptStore = new ReceiptStore(db.getConn());
  const receiptController = new ReceiptController(receiptStore);

  router.post("/create", (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new BadRequestError({ code: 400, message: "Invalid receipt payload validation", context: { error: errors.array() } });
      return next(err);
    }

    receiptController.createReceipt(req, res, next);
  });

  router.post("/delete", (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new BadRequestError({ code: 400, message: "Invalid receipt payload validation", context: { error: errors.array() } });
      return next(err);
    }

    receiptController.deleteReceipt(req, res, next);
  });

  router.get("/view", (req: Request, res: Response, next: NextFunction) => {
    receiptController.getReceipts(req, res, next);
  });

  router.get("/view_details", (req: Request, res: Response, next: NextFunction) => {
    receiptController.getReceiptDetails(req, res, next);
  });

  return router;
};

export default receiptRouter;
