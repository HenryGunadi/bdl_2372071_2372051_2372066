import { Response } from "express";
import BadRequestError from "../classes/BadReqError";

const errorMiddleware = (err: BadRequestError, res: Response) => {
  console.log("Error in middleware:", err);

  if (err instanceof BadRequestError) {
    res
      .status(err.statusCode || 400)
      .setHeader("Content-Type", "application/json")
      .json({ message: err.message });
  }

  return res.status(500).setHeader("Content-Type", "application/json").json({
    message: "Internal Server Error",
  });
};

export default errorMiddleware;
