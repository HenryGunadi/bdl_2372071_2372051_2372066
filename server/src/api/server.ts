import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import setCorsHeaders from "../middlewares/cors";
import { DB } from "../db/db";
import authRouter from "../routes/auth";
import { errorMiddleware } from "../middlewares/error";
import inventoryAuth from "../routes/items";

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
    this._APIServer.use("/auth", authRouter(this._DB));
    this._APIServer.use("/inventory", inventoryAuth(this._DB));

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
