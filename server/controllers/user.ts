import { NextFunction, Request, Response } from 'express';
import { validationResult } from "express-validator"
import mongoose from 'mongoose';
import { config } from "../config/config"
import User from "../models/user"
import jwt from "jsonwebtoken"

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    try {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()) {
            return res.status(400).json({ message: "Error" })
        }
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            password
        });

        await user.save()
        return res.status(201).json({ user, message: "user successfully registered !!!" })
    }
    catch (error) {
        return res.status(500).json({ error, message: "Internal server error" })
    }


};

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()) {
            return res.status(400).json({ message: "Error" })
        }
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        user.comparePassword(password, async (err: any, isMatch: boolean) => {

            if (err || !isMatch) {
                return res.status(400).json({ message: "Invalid Password" })
            }
            const jwtkey = config.jwt_secret.key;
            const token = await jwt.sign({ id: user._id }, jwtkey)
            return res.status(200).json({ user, message: "user successfully Logged in!!!" ,token})
        })
    }
    catch (error) {
        return res.status(500).json({ error, message: "Internal server error" })
    }


};



const readAll = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((user) => res.status(200).json({ user }))
        .catch((error) => res.status(500).json({ error }));
};

const readUser = async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try{
        const user = await User.findOne({_id:id});
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json({user,message:"User found"});
    }catch(error){
        return res.status(500).json({error,message:"Internal server error"})
    }
};



export default { createUser, readAll, LoginUser ,readUser}; 