import express, { NextFunction, Request, Response, Router } from "express";
import AdminStore from "../services/adminStore";
import AdminController from "../controller/adminController";
import { loginValidator, registerValidator } from "../validators/authValidator";
import { validationResult } from "express-validator";
import BadRequestError from "../classes/BadReqError";
import { DB } from "../db/db";
import errorMiddleware from "../middlewares/error";

const authRouter = (db: DB): Router => {
  const router = express.Router();
  const adminStore = new AdminStore(db.getConn());
  const adminController = new AdminController(adminStore);

  // register router
  router.post("/register", registerValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).setHeader("Content-Type", "application/json").json({ message: `Invalid register payload validation`, error: errors.array() });
      return;
    }

    adminController.register(req, res, next);
  });

  // login router
  router.post("/login", loginValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).setHeader("Content-Type", "application/json").json({ message: `Invalid login payload validation`, error: errors.array() });
      return;
    }

    adminController.login(req, res, next);
  });

  // error middleware
  router.use((err: BadRequestError, req: Request, res: Response) => {
    errorMiddleware(err, res);
  });

  return router;
};

export default authRouter;
