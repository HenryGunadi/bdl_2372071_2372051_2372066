import { body, query } from "express-validator";

export const updateReturnItemsValidator = [
  body("id").notEmpty().withMessage("ID is required").isString().withMessage("ID must be a string"),

  body("item_id").optional().isString().withMessage("Item ID must be a string"),

  body("quantity").optional().isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),

  body("return_date").optional().isISO8601().withMessage("Return date must be a valid ISO 8601 date"),

  body("created_at").optional().isISO8601().withMessage("Created at must be a valid ISO 8601 date"),
];

export const deleteReturnItemValidator = [query("id").notEmpty().withMessage("Return item ID is required")];
