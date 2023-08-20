import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from "bcrypt";
import Blog from "../models/blog"

export interface IUser {
    username: string,
    email : string,
    password:string,
    blog:typeof Blog,
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { 
            type: String, 
            required: true,
            unique:true
         },
        email : {
            type: String,
             required: true,
             unique:true
            },
        password : {
            type: String, 
            required:true
        },
        blog:{
            type:Array,

        }
    },
    {
        versionKey: false
    }
);

UserSchema.pre("save",function(next){
    const user = this;
    if(!user.isModified("password")){
        return next();
    }

    if(user.isModified("password")){
        bcrypt.genSalt(10,function(err,salt){
                if(err) return next(err)

            //hash password
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();

            });
        });
    };
});


UserSchema.methods.comparePassword = function(candidatePassword:string,cb:(arg:any,isMatch ?:boolean)=>void){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

const User = mongoose.model('User', UserSchema);
export default User ;