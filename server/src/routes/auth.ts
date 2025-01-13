import "express-async-errors"; // handle catching async errors
import express, { NextFunction, Request, Response, Router } from "express";
import AdminDao from "../services/adminDao";
import AdminController from "../controller/adminController";
import { loginValidator, registerValidator } from "../validators/authValidator";
import { validationResult } from "express-validator";
import BadRequestError from "../classes/BadReqError";
import { DB } from "../db/db";

const authRouter = (db: DB): Router => {
  const router = express.Router();
  const adminDao = new AdminDao(db.getConn());
  const adminController = new AdminController(adminDao);

  // register router
  // router.post("/register", registerValidator, (req: Request, res: Response, next: NextFunction) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     const err = new BadRequestError({ code: 400, message: "Invalid register payload validation", context: { error: errors.array() } });
  //     return next(err);
  //   }

  //   adminController.register(req, res, next);
  // });

  // login router
  router.post("/login", loginValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new BadRequestError({ code: 400, message: "Invalid login payload validation", context: { error: errors.array() } });
      return next(err);
    }

    adminController.login(req, res, next);
  });

  return router;
};

export default authRouter;
