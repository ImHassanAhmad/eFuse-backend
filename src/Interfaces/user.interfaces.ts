import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
}

export interface IUserDoc extends mongoose.Document, IUser {}

export interface IUserResponse extends Response {
  status: (code: number) => any;
}
export interface IUserRequest extends Request {
  body: IUser;
  params: {
    id?: string;
  };
}
