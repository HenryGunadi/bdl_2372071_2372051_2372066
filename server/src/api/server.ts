import express, { Express } from "express";
import cookieParser from "cookie-parser";
import setCorsHeaders from "../middlewares/cors";

export class APIServer {
  private _APIServer: Express;
  private _PORT: string;

  constructor(port: string) {
    this._APIServer = express();
    this._PORT = port;
  }

  run(): void {
    // middlewares
    this._APIServer.use(express.json());
    this._APIServer.use(express.urlencoded({ extended: true }));
    this._APIServer.use(setCorsHeaders);
    this._APIServer.use(cookieParser());

    this._APIServer.listen(this._PORT, () => console.log(`Server started on PORT : ${this._PORT}`));
  }
}
