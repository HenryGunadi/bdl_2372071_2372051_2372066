import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ReqValidated } from "../types/types";

const verifyToken = (req: ReqValidated, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  // check token in cookies
  if (!token) {
    return res.status(401).json({ message: "User is not authorized" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, "testing-secret-key");
    req.user = decoded;
    next();
  } catch (err: any) {
    switch (err.name) {
      case "TokenExpiredError":
        res.status(401).json({ message: "Token has expired" });
        break;
      case "JsonWebTokenError":
        res.status(401).json({ message: "Invalid token" });
        break;
      default:
        res.status(500).json({ message: "Something went wrong" });
    }
  }
};
