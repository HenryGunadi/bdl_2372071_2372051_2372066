import express, { NextFunction, Request, Response } from "express";
import AdminStore from "../services/adminStore";
import AdminController from "../controller/adminController";
import { registerValidator } from "../validators/authValidator";
import { validationResult } from "express-validator";
import BadRequestError from "../classes/BadReqError";
import exp from "constants";
import { DB } from "../db/db";
import { config } from "../env/config";

const router = express.Router();
const db = new DB(config);

// handlers
const adminStore = new AdminStore();
const adminController = new AdminController(adminStore);

// register router
router.post("/register", registerValidator, (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new BadRequestError({ code: 400, message: "Invalid payload validation" });
    next(error);
    return;
  }

  adminController.register(req, res, next);
});

export default router;
