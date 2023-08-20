import { NextFunction, Request, Response } from 'express';
import { validationResult } from "express-validator"
import mongoose from 'mongoose';
import { config } from "../config/config"
import User from "../models/user"
import Blog from '../models/blog';


const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    const { title,date,likes,comments} = req.body;

    try {
        const validationErr = validationResult(req);
        if (!validationErr.isEmpty()) {
            return res.status(400).json({ message: "Error" })
        }
        const blog = new Blog({
            _id: new mongoose.Types.ObjectId(),
            title:title,
            author:User,
            likes:0,
            date:Date,
            comments:[]
        });

        await blog.save()
        return res.status(201).json({ blog, message: "blog successfully created !!!" })
    }
    catch (error) {
        return res.status(500).json({ error, message: "Internal server error" })
    }


};
