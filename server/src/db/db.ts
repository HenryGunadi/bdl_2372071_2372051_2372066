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

  getConn() {
    if (!this._conn) {
      throw new Error("DB connection hasn't been established");
    }

    return this._conn;
  }

  async connect(): Promise<void> {
    try {
      this._conn = await sql.connect(this._config);
      console.log("Connected to database.");
    } catch (err) {
      console.log("Error connecting to database : ", err);
      throw new Error(`Database connection failed`);
    }
  }
}
