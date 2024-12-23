import sql, { MAX } from "mssql";
import { CreateReceiptPayload, ReceiptStoreInterface } from "../types/types";
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

  // total_subtotal = null?
  // total_discount = null?
  // total_amount = null?
  async createReceipt(receipt: CreateReceiptPayload): Promise<boolean | BadRequestError> {
    try {
      const itemTable = new sql.Table();
      itemTable.columns.add("item_id", sql.VarChar(48));
      itemTable.columns.add("quantity", sql.Decimal(10, 2));

      receipt.items.forEach((item) => {
        itemTable.rows.add(item.item_id, item.quantity);
      });

      console.log("Request Params:", {
        payment_method: "BCA",
        total_subtotal: 100.5,
        total_discount: 20.25,
        total_amount: 40.125,
        tax_id: "TAX-0001",
        items: itemTable,
      });

      const result = await this._dbConn
        .request()
        .input("payment_method", sql.VarChar(30), "BCA")
        .input("total_subtotal", sql.Decimal(10, 2), 100.5)
        .input("total_discount", sql.Decimal(10, 2), 20.25)
        .input("total_amount", sql.Decimal(10, 2), 40.125)
        .input("tax_id", sql.VarChar(48), "TAX-0001")
        .input("items", itemTable)
        .execute("sp_insert_receipt_test");

      return result.rowsAffected[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error creating receipt : ${err}` } });
      console.error("Error creating receipt : ", err);
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
