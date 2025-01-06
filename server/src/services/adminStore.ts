import BadRequestError from "../classes/BadReqError";
import Admin from "../model/admin";
import { AdminStoreInterface } from "../types/types";
import sql, { IRecordSet } from "mssql";

class AdminStore implements AdminStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async getAllAdmin(): Promise<IRecordSet<Admin> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM admin");
      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error" });
      return error;
    }
  }

  async findAdmin(email: string): Promise<IRecordSet<Admin> | BadRequestError> {
    try {
      // check if admin exists
      const res = await this._dbConn.request().input("email", sql.NVarChar, email).query("SELECT * FROM admin WHERE email = @email");

      if (res.recordset.length === 0) {
        // check if return result is empty
        console.log("Admin doesnt exists.");
      }

      return res.recordset;
    } catch (err) {
      console.error("Error finding admin: ", err);
      const error = new BadRequestError({ code: 500, message: `Internal server error : ${err}` });
      return error;
    }
  }

  async insertAdmin(admin: Admin): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("name", admin.name).input("password", admin.password).input("email", admin.email).input("phone_number", admin.phone_number).execute("sp_insert_admin");

      // check if insert success
      const success = res.rowsAffected[0] > 0;

      return success;
    } catch (err) {
      console.error("Error finding admin: ", err);
      const error = new BadRequestError({ code: 500, message: "Internal server error" });
      return error;
    }
  }
}

export default AdminStore;
