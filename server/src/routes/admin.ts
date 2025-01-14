import { NextFunction, Request, Response, Router } from "express";
import { DB } from "../db/db";
import express from "express";
import AdminDao from "../dao/adminDao";
import AdminController from "../controller/adminController";

const AdminRouter = (db: DB): Router => {
  const router = express.Router();
  const adminDao = new AdminDao(db.getConn());
  const adminController = new AdminController(adminDao);

  router.get("/view", (req: Request, res: Response, next: NextFunction) => {
    adminController.viewAdmin(req, res, next);
  });
  router.post("/create", (req: Request, res: Response, next: NextFunction) => {
    adminController.createAdmin(req, res, next);
  });
  router.patch("/update", (req: Request, res: Response, next: NextFunction) => {
    adminController.updateAdmin(req, res, next);
  });
  router.delete("/delete", (req: Request, res: Response, next: NextFunction) => {
    adminController.deleteAdmin(req, res, next);
  });

  return router;
};

export default AdminRouter;
