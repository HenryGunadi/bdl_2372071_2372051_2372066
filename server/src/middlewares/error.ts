import { NextFunction, Request, Response } from "express";
import BadRequestError from "../classes/BadReqError";

const errorMiddleware = (err: BadRequestError, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode || 400).json({ message: err.message }); // Respond with custom error message
  }

  // Generic error response (for other types of errors)
  res.status(500).json({
    message: 'Internal Server Error',
  });
}

export default errorMiddleware