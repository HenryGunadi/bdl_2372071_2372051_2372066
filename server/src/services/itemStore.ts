import sql from "mssql";
import { CreateItemPayload, ItemStoreInterface, SearchParameterPayload } from "../types/types";
import BadRequestError from "../classes/BadReqError";
import Item from "../model/item";
import { Decimal } from "msnodesqlv8";

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

      console.log("QUERY : ", query);

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

  // FIX Update
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
}
