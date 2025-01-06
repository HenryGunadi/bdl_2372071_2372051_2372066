import { body } from "express-validator";

export const registerValidator = [
  body("email", "email is empty").not().isEmpty(),
  body("name", "name is empty").not().isEmpty(),
  body("password", "password is empty").not().isEmpty(),
  body("phone_number", "phone_number is empty").not().isEmpty(),
];

export const loginValidator = [body("email", "email is empty").not().isEmpty(), body("password", "password is empty").not().isEmpty()];
