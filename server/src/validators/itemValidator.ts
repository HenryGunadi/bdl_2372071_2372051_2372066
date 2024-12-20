import { body } from "express-validator";

export const insertItemValidator = [
  body("nama", "Nama is empty").not().isEmpty(),
  body("qrcode", "Qrcode is empty").not().isEmpty(),
  body("price", "Price must be a number").isNumeric(),
  body("supplier_id", "Supplier ID must be a string").isString(),
  body("expired_date", "Expired date must be a valid date").isISO8601(), // check whether its a valid date
  body("description", "Description is empty").not().isEmpty(),
  body("discount", "Discount must be a number").isNumeric(),
  body("image_url", "Image URL is empty").not().isEmpty(),
  body("category_id", "Category ID must be a string").isString(),
];
export const deleteItemValidator = [body("id", "ID is required and must be a string").not().isEmpty().isString()];
export const findItemByNameValidator = [body("name", "Name is required and must be a string").not().isEmpty().isString()];
export const getItemsByCategoryValidator = [body("category_id", "Category ID is required and must be a string").not().isEmpty().isString()];
