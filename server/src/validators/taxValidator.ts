import exp from "constants";
import { body } from "express-validator";
import { query } from "express-validator";

export const createTaxValidator = [
  // Tax rate validation (ensure it's numeric and a decimal if necessary)
  body("tax_rate").not().isEmpty().withMessage("Tax rate is required").isDecimal().withMessage("Tax rate must be a valid decimal number"),

  // Start date validation (ISO 8601 format, or specific format like YYYY-MM-DD)
  body("start_date").not().isEmpty().withMessage("Start date is required").isISO8601().withMessage("Start date must be a valid ISO 8601 date"),

  // End date validation (ISO 8601 format, or specific format like YYYY-MM-DD)
  body("end_date")
    .not()
    .isEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid ISO 8601 date")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start_date)) {
        throw new Error("End date must be later than the start date");
      }
      return true;
    }),
];

export const updateTaxValidator = [
  body("id").not().isEmpty().withMessage("Tax id is required"),
  body("tax_rate").not().isEmpty().withMessage("Tax rate is required").isDecimal().withMessage("Tax rate must be a valid decimal number"),
  body("start_date").not().isEmpty().withMessage("Start date is required").isISO8601().withMessage("Start date must be a valid ISO 8601 date"),
  body("end_date")
    .not()
    .isEmpty()
    .withMessage("End date is required")
    .isISO8601()
    .withMessage("End date must be a valid ISO 8601 date")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.start_date)) {
        throw new Error("End date must be later than the start date");
      }
      return true;
    }),
];

export const deleteTaxValidator = [query("id").not().isEmpty().withMessage("Tax id is missing")];
