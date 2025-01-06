import { NextFunction, Request, Response, Router } from "express";
import { DB } from "../db/db";
import express from "express";
import { createTaxValidator, deleteTaxValidator, updateTaxValidator } from "../validators/taxValidator";
import { validationResult } from "express-validator";
import BadRequestError from "../classes/BadReqError";
import TaxStore from "../services/taxStore";
import TaxController from "../controller/taxController";

const taxRouter = (db: DB): Router => {
  const router = express.Router();
  const taxStore = new TaxStore(db.getConn());
  const taxController = new TaxController(taxStore);

  router.post("/create", createTaxValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new BadRequestError({ code: 400, message: "Invalid tax payload validation", context: { error: errors.array() } });
      return next(err);
    }

    taxController.createTax(req, res, next);
  });

  router.get("/search", (req: Request, res: Response, next: NextFunction) => {
    taxController.getTax(req, res, next);
  });

  router.delete("/delete", deleteTaxValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new BadRequestError({ code: 400, message: "Invalid tax payload validation", context: { error: errors.array() } });
      return next(err);
    }

    taxController.deleteTax(req, res, next);
  });

  router.put("/update", updateTaxValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new BadRequestError({ code: 400, message: "Invalid tax payload validation", context: { error: errors.array() } });
      return next(err);
    }

    taxController.updateTax(req, res, next);
  });

  return router;
};

export default taxRouter;
