import sql, { IRecordSet } from "mssql";
import BadRequestError from "../classes/BadReqError";
import ReturnItems from "../model/returnItems";
import { ReturnItemsInterface, UpdateReturnItemsPayload } from "../types/types";

class ReturnItemsStore implements ReturnItemsInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async getReturnItems(): Promise<IRecordSet<ReturnItems> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM return_items");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error getting return items : ${err}` } });
      return error;
    }
  }

  async updateReturnItems(payload: UpdateReturnItemsPayload): Promise<boolean | BadRequestError> {
    try {
      const res = this._dbConn.request();

      for (const [name, value] of Object.entries(payload)) {
        const sqlType = typeof value === "number" ? sql.Int : typeof value === "string" ? sql.VarChar : sql.DateTime;

        res.input(name, sqlType, value);
      }

      const result = await res.execute("sp_update_return_items");
      return result.rowsAffected[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error updating return item : ${err}` } });
      return error;
    }
  }

  async deleteReturnItems(id: string): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", id).execute("sp_delete_return_items");

      return res.rowsAffected[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting return item : ${err}` } });
      return error;
    }
  }
}

export default ReturnItemsStore;
