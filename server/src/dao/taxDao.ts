import sql from "mssql";
import { TaxPayload, TaxStoreInterface } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Tax from "../model/tax";

class TaxDao implements TaxStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async createTax(tax: Tax): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("tax_rate", tax.taxRate).input("start_date", tax.startDate).input("end_date", tax.endDate).execute("sp_insert_tax");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error creating tax : ${err}` } });
      return error;
    }
  }

  async deleteTax(id: string): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", id).execute("sp_delete_tax");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting tax : ${err}` } });
      return error;
    }
  }

  async updateTax(updateValue: TaxPayload): Promise<boolean | BadRequestError> {
    try {
      console.log("UPDATE CATEGORY PAYLOAD : ", updateValue);
      const res = this._dbConn.request();

      for (const [key, value] of Object.entries(updateValue)) {
        const sqlType = typeof value === "string" ? sql.VarChar : typeof value === "number" ? sql.Decimal(5, 2) : sql.DateTime;

        res.input(key, sqlType, value);
      }

      const result = await res.execute("sp_update_tax");
      return result.rowsAffected[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting tax : ${err}` } });
      return error;
    }
  }

  async getTaxes(): Promise<sql.IRecordSet<Tax> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM tax");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting tax : ${err}` } });
      return error;
    }
  }
}

export default TaxDao;
