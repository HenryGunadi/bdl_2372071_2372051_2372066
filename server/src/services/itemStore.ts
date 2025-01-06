import sql from "mssql";
import { ItemStoreInterface, SearchParameterPayload, UpdateItemPayload } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Item from "../model/item";

export class ItemStore implements ItemStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async getItems(searchParameter: SearchParameterPayload): Promise<sql.IRecordSet<Item> | BadRequestError> {
    try {
      let query = "SELECT * FROM items";
      const parameters: any[] = [];
      let whereClause: string[] = [];

      if (searchParameter.name) {
        whereClause.push("nama = @nama");
        parameters.push({ name: "nama", value: searchParameter.name });
      }

      if (searchParameter.qrcode) {
        whereClause.push("qrcode = @qrcode");
        parameters.push({ name: "qrcode", value: searchParameter.qrcode });
      }

      if (searchParameter.category_id) {
        whereClause.push("category_id = @category_id");
        parameters.push({ name: "category_id", value: searchParameter.category_id });
      }

      if (whereClause.length > 0) {
        query += " WHERE " + whereClause.join(" AND ");
      }

      const res = this._dbConn.request();

      parameters.forEach((param) => {
        const sqlType = param.name === "category_id" ? sql.Int : sql.VarChar;
        res.input(param.name, sqlType, param.value);
      });

      const response = await res.query(query);

      return response.recordset;
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
        .input("qrcode", item.qrcode)
        .input("price", item.price)
        .input("supplier_id", item.supplierId)
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

  async updateItem(udpateValues: UpdateItemPayload): Promise<boolean | BadRequestError> {
    try {
      const res = this._dbConn.request();
      const parameters: { name: string; value: string }[] = [];

      for (const [name, value] of Object.entries(udpateValues)) {
        const sqlType = typeof value === "string" ? sql.VarChar : typeof value === "number" ? sql.Decimal(10, 2) : sql.DateTime;

        res.input(name, sqlType, value);
      }

      const result = await res.execute("sp_update_item");
      return result.rowsAffected[0] > 0;
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
