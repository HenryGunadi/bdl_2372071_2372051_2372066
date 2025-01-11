import { body } from "express-validator";
import { query } from "express-validator";

export const insertItemValidator = [
  body("nama", "Nama is empty").not().isEmpty(),
  body("qrcode", "Qrcode is empty").not().isEmpty(),
  body("price").not().isEmpty().withMessage("Price is required").isFloat({ gt: 0 }).withMessage("Price must be a valid number"),
  body("supplier_id").not().isEmpty().withMessage("Supplier id is required"),
  body("description", "Description is empty").not().isEmpty(),
  body("discount")
    .optional()
    .custom((value) => {
      if (value !== null && value !== "") {
        // Validate that discount is a valid number greater than 0
        return !isNaN(value) && parseFloat(value) > 0;
      }

      return true; // If discount is null, no validation is applied
    }),
  body("category_id").not().isEmpty().withMessage("Category is required"),
];

export const deleteItemValidator = [query("id", "ID is required and must be a string").not().isEmpty().isString()];
export const findItemByNameValidator = [body("name", "Name is required and must be a string").not().isEmpty().isString()];
export const getItemsByCategoryValidator = [body("category_id", "Category ID is required and must be a string").not().isEmpty().isString()];

export const updateItemValidator = [
  body("id").notEmpty().withMessage("Item ID is required").isString().withMessage("Item ID must be a string"),

  body("nama").optional().isString().withMessage("Nama must be a string"),

  body("qrcode").optional().isString().withMessage("QR Code must be a string"),

  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),

  body("supplier_id").optional().isString().withMessage("Supplier ID must be a string"),

  body("description").optional().isString().withMessage("Description must be a string"),

  body("discount")
    .optional()
    .custom((value) => value === null || (typeof value === "number" && value >= 0 && value <= 100))
    .withMessage("Discount must be a number between 0 and 100, or null"),

  body("image_url").optional().isURL().withMessage("Image URL must be a valid URL"),
];
