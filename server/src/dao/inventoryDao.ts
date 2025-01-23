import sql from "mssql";
import { InventoryStoreInterface, UpdateInventoryPayload, ViewInventory } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Inventory from "../model/inventory";

class InventoryDao implements InventoryStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async getInventories(): Promise<sql.IRecordSet<ViewInventory> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM vw_inventory");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error getting inventories : ${err}` } });
      return error;
    }
  }

  async insertInventory(inventory: Inventory): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("item_id", inventory.itemId).input("quantity", inventory.quantity).execute("sp_insert_inventory");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error creating inventory : ${err}` } });
      return error;
    }
  }

  async updateInventory(value: Inventory): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("item_id", sql.VarChar, value.itemId).input("quantity", value.quantity).input("add_stock", sql.Bit, 0).execute("sp_update_inventory");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error getting inventories : ${err}` } });
      return error;
    }
  }

  async deleteInventory(itemID: string): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("item_id", itemID).execute("sp_delete_inventory");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error getting inventories : ${err}` } });
      return error;
    }
  }
}

export default InventoryDao;
