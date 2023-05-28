import { errorHandler, responseHandler } from "../Common/responseHandlers";
import {
  IUserRequest,
  IUser,
  IUserResponse,
} from "../Interfaces/user.interfaces";
import User from "../Service/user.service";
import Joi from "joi";

const createUser = async (req: IUserRequest, res: IUserResponse) => {
  const { email, firstName, lastName, userName } = req.body;

  let packet: IUser = { email, firstName, lastName, userName };

  const schema = Joi.object<IUser>({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
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
    let payload = await User.createUser(packet);
    return responseHandler(200, "User created successfully", res, payload);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Internal Server Error") {
        return errorHandler(500, error.message, res);
      }
      return errorHandler(401, error.message, res);
    }
  }
};

const getUsers = async (req: IUserRequest, res: IUserResponse) => {
  try {
    let payload = await User.getUsers();
    return responseHandler(200, "List of Users", res, payload);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Internal Server Error") {
        return errorHandler(500, error.message, res);
      }
      return errorHandler(401, error.message, res);
    }
  }
};

const getUser = async (req: IUserRequest, res: IUserResponse) => {
  const { id } = req.params;
  try {
    let payload = await User.getUser(id);
    return responseHandler(200, "User found", res, payload);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Internal Server Error") {
        return errorHandler(500, error.message, res);
      }
      return errorHandler(401, error.message, res);
    }
  }
};

const getUserPosts = async (req: IUserRequest, res: IUserResponse) => {
  const { id } = req.params;
  try {
    let payload = await User.getUserPosts(id);
    return responseHandler(200, "User found", res, payload);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Internal Server Error") {
        return errorHandler(500, error.message, res);
      }
      return errorHandler(401, error.message, res);
    }
  }
};

const updateUser = async (req: IUserRequest, res: IUserResponse) => {
  const { id } = req.params;
  const { email, firstName, lastName, userName } = req.body;
  let packet: IUser = { email, firstName, lastName, userName };

  const schema = Joi.object<IUser>({
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    userName: Joi.string(),
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
    let payload = await User.updateUser(id, packet);
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

export { getUsers, getUser, createUser, updateUser, getUserPosts };
