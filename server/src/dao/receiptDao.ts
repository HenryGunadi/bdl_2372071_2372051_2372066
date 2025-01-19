import sql, { MAX } from "mssql";
import { CreateReceiptPayload, DeletePOReceiptPayload, ReceiptDetail, ReceiptStoreInterface } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Receipt from "../model/receipt";

class ReceiptDao implements ReceiptStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async getReceipt(): Promise<sql.IRecordSet<Receipt> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM view_receipt_details");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error getting receipts : ${err}` } });
      return error;
    }
  }

  async getReceiptDetails(): Promise<sql.IRecordSet<ReceiptDetail> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM receipt_items");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error getting receipts : ${err}` } });
      return error;
    }
  }

  async createReceipt(receipt: CreateReceiptPayload): Promise<boolean | BadRequestError> {
    try {
      // passed a table as an argument to the query
      const itemTable = new sql.Table();
      itemTable.columns.add("items_id", sql.VarChar(48));
      itemTable.columns.add("quantity", sql.Int);
      itemTable.columns.add("unit_price", sql.Decimal(10, 2));
      itemTable.columns.add("unit_discount", sql.Decimal(10, 2));

      receipt.items.forEach((item) => {
        itemTable.rows.add(item.items_id, item.quantity, item.unit_price, item.unit_discount);
      });

      console.log("RECEIPT TABLE : ", itemTable);

      const result = await this._dbConn
        .request()
        .input("payment_method", sql.VarChar(30), receipt.payment_method)
        .input("total_subtotal", sql.Decimal(10, 2), receipt.total_subtotal)
        .input("total_discount", sql.Decimal(10, 2), receipt.total_discount)
        .input("total_amount", sql.Decimal(10, 2), receipt.total_amount)
        .input("tax_id", sql.VarChar(48), receipt.tax_id)
        .input("items", itemTable)
        .execute("sp_insert_receipt");

      return result.rowsAffected[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { err } });
      console.error("Error creating receipt : ", err);
      return error;
    }
  }

  async deleteReceipt(payload: DeletePOReceiptPayload): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", payload.id).input("undo", payload.undo).execute("sp_delete_receipt");

      const success = res.rowsAffected[0] > 0;

      // If no rows are affected, return false (indicating nothing was deleted)
      return success ? true : false;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting receipt : ${err}` } });
      return error;
    }
  }
}

export default ReceiptDao;
