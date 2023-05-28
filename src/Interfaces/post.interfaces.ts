import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";

export interface IPost {
  user: string;
  title: string;
  content: string;
}

export interface IPostDoc extends mongoose.Document, IPost {}

export interface IPostResponse extends Response {
  status: (code: number) => any;
}
export interface IPostRequest extends Request {
  body: IPost;
  params: {
    id?: string;
  };
}
