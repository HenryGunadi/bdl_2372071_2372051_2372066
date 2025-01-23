import sql from "mssql";
import { CreatePOPayload, DeletePOReceiptPayload, PODetails, PurchaseOrderStoreInterface, UpdatePOPayload, ViewInventory } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import PurchaseOrder from "../model/purchaseOrder";

class PurchaseOrderDao implements PurchaseOrderStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async getPO(): Promise<sql.IRecordSet<PurchaseOrder> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM view_supplier_po");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({
        code: 500,
        message: "Internal server error",
        context: { error: `Error getting purchase orders : ${err}` },
      });
      return error;
    }
  }

  async viewPODetails(poID: string): Promise<sql.IRecordSet<PODetails> | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("PurchaseOrderID", sql.VarChar, poID).query("SELECT * FROM dbo.GetPODetails(@PurchaseOrderID)");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({
        code: 500,
        message: "Internal server error",
        context: { error: `Error getting purchase orders : ${err}` },
      });
      return error;
    }
  }

  async createPO(payload: CreatePOPayload): Promise<boolean | BadRequestError> {
    try {
      const itemTable = new sql.Table();
      itemTable.columns.add("item_id", sql.VarChar(48));
      itemTable.columns.add("quantity", sql.Int);
      itemTable.columns.add("unit_price", sql.Decimal(10, 2));

      payload.items.forEach((item) => {
        itemTable.rows.add(item.item_id, item.quantity, item.unit_price);
      });

      const res = this._dbConn.request();
      res.input("payment_method", sql.VarChar, payload.payment_method);
      res.input("currency", sql.VarChar, payload.currency);
      res.input("total_subtotal", sql.Decimal(10, 2), payload.total_subtotal);
      res.input("total_amount_due", sql.Decimal(10, 2), payload.total_amount_due);
      res.input("supplier_id", sql.VarChar(10), payload.supplier_id);
      res.input("status", sql.VarChar(20), payload.status);
      res.input("items", itemTable);

      const result = await res.execute("sp_insert_po");
      return result.rowsAffected[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error creating po : ${err}` } });
      return error;
    }
  }

  async deletePO(payload: DeletePOReceiptPayload): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", payload.id).input("undo", payload.undo).execute("sp_delete_po");

      return true;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting po : ${err}` } });
      return error;
    }
  }

  async updatePO(payload: UpdatePOPayload): Promise<boolean | BadRequestError> {
    try {
      const request = this._dbConn.request();
      console.log("PAYLOAD FROM UPDATE PO : ", payload);

      for (const [key, value] of Object.entries(payload)) {
        request.input(key, value);
      }

      const result = await request.execute("sp_update_po");
      return result.rowsAffected[0] > 0;
    } catch (err) {
      const error = new BadRequestError({
        code: 500,
        message: "Internal server error",
        context: { error: `Error deleting purchase order : ${err}` },
      });
      return error;
    }
  }
}

export default PurchaseOrderDao;
