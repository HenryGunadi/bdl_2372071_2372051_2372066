import sql from "mssql";
import { ReceiptStoreInterface } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Receipt from "../model/receipt";

class ReceiptStore implements ReceiptStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async getReceipt(): Promise<sql.IRecordSet<Receipt> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM receipt");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error getting receipts : ${err}` } });
      return error;
    }
  }

  async createReceipt(receipt: Receipt): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn
        .request()
        .input("payment_method", receipt.paymentMethod)
        .input("total_subtotal", receipt.totalSubtotal)
        .input("total_discount", receipt.totalDiscount)
        .input("total_amount", receipt.totalAmount)
        .input("tax_id", receipt.taxId)
        .execute("sp_insert_receipt");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error creating receipt : ${err}` } });
      return error;
    }
  }

  async deleteReceipt(id: string): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", id).execute("sp_delete_receipt");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting receipt : ${err}` } });
      return error;
    }
  }
}

export default ReceiptStore;
