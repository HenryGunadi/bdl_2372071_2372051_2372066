import sql from "mssql";
import { CreateItemPayload, ItemStoreInterface } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Item from "../model/item";
import { Decimal } from "msnodesqlv8";

export class ItemStore implements ItemStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async findItemByName(name: string): Promise<sql.IRecordSet<Item> | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("nama", name).query("SELECT * FROM items WHERE name = @nama");
      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error finding item by name : ${err}` } });
      return error;
    }
  }

  async insertItem(item: Item): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn
        .request()
        .input("nama", item.nama)
        .input("qrcode", item.qrcode)
        .input("price", item.price)
        .input("supplier_id", item.supplierId)
        .input("expired_date", item.expiredDate)
        .input("description", item.desc)
        .input("discount", item.discount)
        .input("image_url", item.imageUrl)
        .input("category_id", item.categoryId)
        .execute("sp_insert_items");

      // check if insert successful
      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error inserting item : ${err}` } });
      return error;
    }
  }

  async updateItem(udpateValues: CreateItemPayload): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn
        .request()
        .input("nama", udpateValues.nama)
        .input("qrcode", udpateValues.qrcode)
        .input("price", udpateValues.price)
        .input("supplier_id", udpateValues.supplier_id)
        .input("expired_date", udpateValues.expired_date)
        .input("description", udpateValues.description)
        .input("discount", udpateValues.discount)
        .input("image_url", udpateValues.image_url)
        .input("category_id", udpateValues.category_id)
        .execute("sp_insert_items");

      const success = res.rowsAffected[0] > 0;

      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error updating item : ${err}` } });
      return error;
    }
  }

  async deleteItem(id: string): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", id).execute("sp_delete_item");

      // check if insert successful
      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting item : ${err}` } });
      return error;
    }
  }

  // FIX whether using category_id or category_name for searching
  // FIX if using SP
  async getItemByCategory(category_id: string): Promise<sql.IRecordSet<Item> | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("category_id", category_id).query("SELECT * FROM items WHERE category_id = @category_id");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error deleting item : ${err}` } });
      return error;
    }
  }
}
