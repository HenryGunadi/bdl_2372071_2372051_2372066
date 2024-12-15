import { exit } from "process";
import dotenv from "dotenv";
import sql from "mssql";
import { Connection, ConnectionConfiguration } from "tedious";

dotenv.config();

export class DB {
  private _conn: Connection;

  constructor(config: ConnectionConfiguration) {
    this._conn = new Connection(config);

    // if there is connection error
    this._conn.on("error", (err) => {
      console.error("Connection error : ", err.message);
      exit(1);
    });
  }

  connect(): void {
    this._conn.on("connect", (err) => {
      // if there is error
      if (err) {
        console.error("Error connecting to database : ", err.message);
        return;
      }

      // if no error
      console.log("Connected to database.");
    });

    this._conn.connect();
  }
}
