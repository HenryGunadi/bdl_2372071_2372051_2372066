import sql from "mssql";
import { SupplierPayload, SupplierStoreInterface } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Supplier from "../model/supplier";

class SupplierStore implements SupplierStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async viewSupplier(): Promise<Supplier[] | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM supplier");
      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error creating tax : ${err}` } });
      return error;
    }
  }

  async createSupplier(payload: SupplierPayload): Promise<boolean | BadRequestError> {
    try {
      const req = this._dbConn.request();

      for (const [key, value] of Object.entries(payload)) {
        req.input(key, value);
      }

      const result = await req.execute("sp_insert_supplier");
      return result.recordset[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error creating tax : ${err}` } });
      return error;
    }
  }

  async updateSupplier(payload: SupplierPayload): Promise<boolean | BadRequestError> {
    try {
      const req = this._dbConn.request();

      for (const [key, value] of Object.entries(payload)) {
        req.input(key, value);
      }

      const result = await req.execute("sp_update_supplier");
      return result.recordset[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error creating tax : ${err}` } });
      return error;
    }
  }

  async deleteSupplier(id: string): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", id).execute("sp_delete_supplier");
      return res.recordset[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error creating tax : ${err}` } });
      return error;
    }
  }
}

export default SupplierStore;
