import { SuiteContext } from "node:test";
import BadRequestError from "../classes/BadReqError";
import Category from "../model/category";
import { CategoryStoreInterface, UpdateCategoryPayload } from "../types/types";
import sql from "mssql";

export class CategoryStore implements CategoryStoreInterface {
  private _dbConn: sql.ConnectionPool;

  constructor(dbConn: sql.ConnectionPool) {
    this._dbConn = dbConn;
  }

  async getAllCategories(): Promise<sql.IRecordSet<Category> | BadRequestError> {
    try {
      const res = await this._dbConn.request().query("SELECT * FROM category");
      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { erorr: "Failed getting categories" } });
      return error;
    }
  }

  // FIX if sp ready
  async deleteCategory(category_id: number): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", sql.Int, category_id).query("DELETE FROM category WHERE id = @id");

      // check if any rows are affected
      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Something went wrong deleting category : ${err}` } });
      return error;
    }
  }

  // FIX if SP ready
  async insertCategory(category: Category): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("category_name", category.category_name).execute("sp_insert_category");

      // check if any rows are affected
      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Something went wrong inserting new category : ${err}` } });
      return error;
    }
  }

  async getCategoryByName(category_name: string): Promise<sql.IRecordSet<Category> | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("category_name", category_name).query("SELECT * FROM category WHERE category_name = @category_name");

      return res.recordset;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { erorr: "Something went wrong finding category" } });
      return error;
    }
  }

  async updateCategory(updated_category: UpdateCategoryPayload): Promise<boolean | BadRequestError> {
    try {
      const res = await this._dbConn.request().input("id", updated_category.id).input("category_name", updated_category.category_name).execute("sp_update_category");

      const success = res.rowsAffected[0] > 0;
      return success;
    } catch (err) {
      const error = new BadRequestError({ code: 500, message: "Internal server error", context: { error: `Error updating category : ${err}` } });
      return error;
    }
  }
}
