import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";
import mongoose from 'mongoose';
import User from "../models/user"



const authorize = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization || ""
        const decode = jwt.verify(token, config.jwt_secret.key)
        req.body.user = decode;
        // console.log(decode)
        // return res.status(200).json({message:"authorized"})
        next();
    } catch (error) {
        return res.status(500).json({ error, message: "Internal server error" })
    }
}


export default authorize;