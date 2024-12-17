import express, { NextFunction, Request, Response, Router } from "express";
import AdminStore from "../services/adminStore";
import AdminController from "../controller/adminController";
import { loginValidator, registerValidator } from "../validators/authValidator";
import { validationResult } from "express-validator";
import BadRequestError from "../classes/BadReqError";
import exp from "constants";
import { DB } from "../db/db";
import { config } from "../env/config";
import errorMiddleware from "../middlewares/error";

// handlers

const authRouter = (db: DB): Router => {
  const router = express.Router();
  const adminStore = new AdminStore(db.getConn());
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

  // login router
  router.post("/login", loginValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new BadRequestError({ code: 400, message: "Invalid payload validation" });
      next(error);
      return;
    }

    adminController.login(req, res, next)
  })

  router.get('/', )

  // error middleware
  router.use(errorMiddleware)

  // login router
  return router;
};

export default authRouter;
