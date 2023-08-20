import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog {
    title: string,
    author : string,
    date:Date,
    likes:number,
    comments:[{text:string}]
}

export interface IBlogModel extends IBlog, Document {}

const BlogSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author : {type: String, required: true},
        date : {type: Date},
        likes:{type:Number},
        comments:[{text:{type: String}}]
        
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Blog = mongoose.model<IBlogModel>('Blog', BlogSchema);
export default Blog