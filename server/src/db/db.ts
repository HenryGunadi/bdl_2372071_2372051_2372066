import { exit } from "process";
import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

export class DB {
  private _config: sql.config;
  private _conn: sql.ConnectionPool | null = null;

  constructor(config: sql.config) {
    this._config = config;
  }

  async connect(): Promise<sql.ConnectionPool> {
    try {
      if (!this._conn) {
        this._conn = await sql.connect(this._config);
        console.log("Connected to database.");
      }

      return this._conn;
    } catch (err) {
      throw new Error("Database connection failed");
    }
  }
}
