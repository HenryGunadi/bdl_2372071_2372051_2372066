import { NextFunction, Request, response, Response, Router } from "express";
import express from "express";
import { DB } from "../db/db";
import ItemController from "../controller/itemController";
import { ItemStore } from "../services/itemStore";
import { deleteItemValidator, insertItemValidator, updateItemValidator } from "../validators/itemValidator";
import { validationResult } from "express-validator";
import BadRequestError from "../classes/BadReqError";
import imageUpload from "../middlewares/imageUpload";

const itemsRouter = (db: DB): Router => {
  const router = express.Router();
  const itemStore = new ItemStore(db.getConn());
  const itemController = new ItemController(itemStore);

  // get items
  router.get("/search", (req: Request, res: Response, next: NextFunction) => {
    itemController.getItem(req, res, next);
  });

  // add items
  router.post("/create", imageUpload.single("image"), insertItemValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new BadRequestError({ code: 400, message: "Invalid item payload validation", context: { error: errors.array() } });
      return next(err);
    }

    itemController.insertItem(req, res, next);
  });

  // delete item
  router.delete("/delete", deleteItemValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new BadRequestError({ code: 400, message: "Invalid item payload validation", context: { error: errors.array() } });
      return next(err);
    }

    itemController.deleteItem(req, res, next);
  });

  // update item
  router.patch("/update", updateItemValidator, (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new BadRequestError({ code: 400, message: "Invalid register payload validation", context: { error: errors.array() } });
      return next(err);
    }

    itemController.updateItem(req, res, next);
  });

  return router;
};

export default itemsRouter;
