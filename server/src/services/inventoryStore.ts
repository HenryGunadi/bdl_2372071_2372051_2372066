import sql from "mssql";
import { InventoryStoreInterface, UpdateInventoryPayload, ViewInventory } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Inventory from "../model/inventory";

class InventoryStore implements InventoryStoreInterface {
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

  async updateInventory(value: UpdateInventoryPayload): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", sql.Int, value.id).input("quantity", value.quantity).execute("sp_update_inventory");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error getting inventories : ${err}` } });
      return error;
    }
  }

  async deleteInventory(id: number): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", id).execute("sp_delete_inventory");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error getting inventories : ${err}` } });
      return error;
    }
  }
}

export default InventoryStore;
