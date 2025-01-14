import sql from "mssql";
import { ItemStoreInterface, UpdateItemPayload } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Item from "../model/item";

export class ItemDao implements ItemStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async viewItems(): Promise<sql.IRecordSet<Item> | BadRequestError> {
    try {
      const result = await this._dbConn.request().query("SELECT * FROM view_category_item");

      return result.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error finding item : ${err}` } });
      return error;
    }
  }

  async insertItem(item: Item): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn
        .request()
        .input("nama", item.nama)
        .input("price", item.price)
        .input("supplier_id", item.supplierId)
        .input("description", item.desc)
        .input("discount", item.discount)
        .input("image_url", item.imageUrl)
        .input("category_id", item.categoryId)
        .input("buy_price", item.buyPrice)
        .execute("sp_insert_items");

      // check if insert successful
      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error inserting item : ${err}` } });
      return error;
    }
  }

  async updateItem(udpateValues: UpdateItemPayload): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn
        .request()
        .input("id", udpateValues.id)
        .input("nama", udpateValues.nama)
        .input("price", udpateValues.price)
        .input("supplier_id", udpateValues.supplier_id)
        .input("description", udpateValues.description)
        .input("discount", udpateValues.discount)
        .input("image", udpateValues.image_url)
        .input("category_id", udpateValues.category_id)
        .input("buy_price", udpateValues.buy_price)
        .execute("sp_update_item");

      return res.rowsAffected[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error updating item : ${err}` } });
      return error;
    }
  }

  async deleteItem(id: string): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", id).execute("sp_delete_item");

      // check if insert successful
      return res.rowsAffected[0] > 0;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting item : ${err}` } });
      return error;
    }
  }
}
