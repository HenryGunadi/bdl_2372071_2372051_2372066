import { NextFunction, Request, Response } from "express";
import TaxStore from "../services/taxStore";
import BadRequestError from "../classes/BadReqError";
import { TaxPayload } from "../types/types";
import Tax from "../model/tax";

class TaxController {
  private _store: TaxStore;

  constructor(store: TaxStore) {
    this._store = store;
  }

  getTax = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryRes = await this._store.getTaxes();

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      }

      return res.status(200).json({ message: "success", taxes: queryRes });
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  createTax = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as TaxPayload;
      const newTax = new Tax(payload.tax_rate, payload.start_date, payload.end_date);

      const queryRes = await this._store.createTax(newTax);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `No rows are affected` } });
          return next(error);
        }

        return res.status(200).json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  deleteTax = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as { id: string };

      const queryRes = await this._store.deleteTax(payload.id);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `No rows are affected` } });
          return next(error);
        }

        return res.status(200).json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };

  updateTax = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as TaxPayload;

      const queryRes = await this._store.deleteTax(payload.id);

      if (queryRes instanceof BadRequestError) {
        return next(queryRes);
      } else {
        if (!queryRes) {
          const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `No rows are affected` } });
          return next(error);
        }

        return res.status(200).json({ message: "success" });
      }
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `${err}` } });
      next(error);
    }
  };
}

export default TaxController;
