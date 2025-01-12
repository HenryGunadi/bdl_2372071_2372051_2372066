import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import setCorsHeaders from "../middlewares/cors";
import { DB } from "../db/db";
import authRouter from "../routes/auth";
import { errorMiddleware } from "../middlewares/error";
import itemsRouter from "../routes/items";
import categoryRouter from "../routes/category";
import inventoryRouter from "../routes/inventory";
import taxRouter from "../routes/tax";
import receiptRouter from "../routes/receipt";
import purchaseOrderRouter from "../routes/purchaseOrder";
import supplierRouter from "../routes/supplier";
import adminRouter from "../routes/admin";

export class APIServer {
  private _APIServer: Express;
  private _PORT: number;
  private _DB: DB;

  constructor(port: number, db: DB) {
    this._APIServer = express();
    this._PORT = port;
    this._DB = db;
  }

  run(): void {
    // middlewares
    this._APIServer.use(express.json());
    this._APIServer.use(express.urlencoded({ extended: true }));
    this._APIServer.use(setCorsHeaders);
    this._APIServer.use(cookieParser());

    // routes
    this._APIServer.use("/api/auth", authRouter(this._DB));
    this._APIServer.use("/api/admin", adminRouter(this._DB));
    this._APIServer.use("/api/items", itemsRouter(this._DB));
    this._APIServer.use("/api/category", categoryRouter(this._DB));
    this._APIServer.use("/api/inventory", inventoryRouter(this._DB));
    this._APIServer.use("/api/tax", taxRouter(this._DB));
    this._APIServer.use("/api/receipt", receiptRouter(this._DB));
    this._APIServer.use("/api/purchase_order", purchaseOrderRouter(this._DB));
    this._APIServer.use("/api/supplier", supplierRouter(this._DB));

    // error middleware
    this._APIServer.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      errorMiddleware(err, req, res, next);
    });

    this._APIServer
      .listen(this._PORT, () => console.log(`Server started on PORT : ${this._PORT}`))
      .on("error", (err) => {
        console.error("Server failed to start: ", err);
      });
  }
}
