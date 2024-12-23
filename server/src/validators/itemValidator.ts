import { body } from "express-validator";

export const insertItemValidator = [
  body("nama", "Nama is empty").not().isEmpty(),
  body("qrcode", "Qrcode is empty").not().isEmpty(),
  body("price").not().isEmpty().withMessage("Price is required").isFloat({ gt: 0 }).withMessage("Price must be a valid number"),
  body("supplier_id").not().isEmpty().withMessage("Supplier id is required"),
  body("expired_date").not().isEmpty().withMessage("Expired date is required").isISO8601().withMessage("Expired date must be a valid date"),
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
  body("image_url", "Image URL is empty").not().isEmpty(),
  body("category_id").not().isEmpty().withMessage("Category is required"),
];

export const deleteItemValidator = [body("id", "ID is required and must be a string").not().isEmpty().isString()];
export const findItemByNameValidator = [body("name", "Name is required and must be a string").not().isEmpty().isString()];
export const getItemsByCategoryValidator = [body("category_id", "Category ID is required and must be a string").not().isEmpty().isString()];
