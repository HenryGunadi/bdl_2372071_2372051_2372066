import express, { Express } from "express";
import cookieParser from "cookie-parser";
import setCorsHeaders from "../middlewares/cors";
import { DB } from "../db/db";
import authRouter from "../routes/auth";

export class APIServer {
  private _APIServer: Express;
  private _PORT: string;
  private _DB: DB;

  constructor(port: string, db: DB) {
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

    // auth routes
    this._APIServer.use("/auth", authRouter(this._DB));
    this._APIServer.listen(this._PORT, () => console.log(`Server started on PORT : ${this._PORT}`));
  }
}
