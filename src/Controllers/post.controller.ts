import { errorHandler, responseHandler } from "../Common/responseHandlers";
import {
  IPostRequest,
  IPost,
  IPostResponse,
} from "../Interfaces/post.interfaces";
import Post from "../Service/post.service";
import Joi from "joi";

const createPost = async (req: IPostRequest, res: IPostResponse) => {
  const { user, title, content } = req.body;

  let packet: IPost = { user, title, content };

  const schema = Joi.object<IPost>({
    user: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  try {
    const { error } = schema.validate(packet);
    if (error) {
      return errorHandler(401, error, res);
    }
  } catch (err) {
    console.error(err);
    return;
  }

  try {
    let payload = await Post.createPost(packet);
    return responseHandler(200, "Post created successfully", res, payload);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Internal Server Error") {
        return errorHandler(500, error.message, res);
      }
      return errorHandler(401, error.message, res);
    }
  }
};

const getPosts = async (req: IPostRequest, res: IPostResponse) => {
  try {
    let payload = await Post.getPosts();
    return responseHandler(200, "Post found", res, payload);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Internal Server Error") {
        return errorHandler(500, error.message, res);
      }
      return errorHandler(401, error.message, res);
    }
  }
};

const getPost = async (req: IPostRequest, res: IPostResponse) => {
  const { id } = req.params;
  try {
    let payload = await Post.getPost(id);
    return responseHandler(200, "Post found", res, payload);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Internal Server Error") {
        return errorHandler(500, error.message, res);
      }
      return errorHandler(401, error.message, res);
    }
  }
};

const updatePost = async (req: IPostRequest, res: IPostResponse) => {
  const { id } = req.params;
  const { user, title, content } = req.body;
  let packet: IPost = { user, title, content };

  const schema = Joi.object<IPost>({
    user: Joi.string(),
    title: Joi.string(),
    content: Joi.string(),
  });

  try {
    const { error } = schema.validate(packet);
    if (error) {
      return errorHandler(401, error, res);
    }
  } catch (err) {
    console.error(err);
    return;
  }

  try {
    let payload = await Post.updateUser(id, packet);
    return responseHandler(200, "User updated succesfully", res, payload);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Internal Server Error") {
        return errorHandler(500, error.message, res);
      }
      return errorHandler(401, error.message, res);
    }
  }
};

export { getPost, createPost, updatePost, getPosts };
