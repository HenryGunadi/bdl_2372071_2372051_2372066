import sql from "mssql";
import { CreatePOPayload, DeletePOReceiptPayload, PODetails, PurchaseOrderStoreInterface, UpdatePOPayload, ViewInventory } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import PurchaseOrder from "../model/purchaseOrder";

class PurchaseOrderController implements PurchaseOrderStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async getPO(): Promise<sql.IRecordSet<PurchaseOrder> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM purchase_order");

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

  async viewPODetails(): Promise<sql.IRecordSet<PODetails> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM purchase_order_details");

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
      itemTable.columns.add("discount", sql.Decimal(10, 2));
      itemTable.columns.add("exp_date", sql.Date);

      payload.items.forEach((item) => {
        itemTable.rows.add(item.item_id, item.quantity, item.unit_price, item.discount, item.exp_date);
      });

      const res = this._dbConn.request();

      for (const [name, value] of Object.entries(payload)) {
        if (name === "items") {
          continue;
        }

        const sqlType = typeof value === "string" ? sql.VarChar : typeof value === "number" ? sql.Decimal(10, 2) : sql.DateTime;

        res.input(name, sqlType, value);
      }
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

      return res.rowsAffected[0] > 0;
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

export default PurchaseOrderController;
