import { NextFunction, Request, Response } from "express";
import BadRequestError from "../classes/BadReqError";
import AdminStore from "../services/adminStore";
import jwt from "jsonwebtoken"

class AuthController {
    private _store: AdminStore

    constructor (store: AdminStore) {
        this._store = store
    }

    authenticateUser (req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.token
        
        // check if cookies has user token
        if (!token) {
            const error = new BadRequestError({code: 400, message: "Missing token payload"})
            next(error)
        }

        // verify token
        const decodedToken = jwt.verify(token, "testing-secret-key")

        // whats next
    }
}