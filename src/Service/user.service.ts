import User from "../Models/user.model";
import Post from "../Models/post.model";
import { IUser, IUserDoc } from "../Interfaces/user.interfaces";
import { setCache, getCache, delCache } from "../Cache/checkCache";

namespace UserSpace {
  export const createUser = async (packet: IUser): Promise<IUserDoc> => {
    try {
      let createdDoc = await new User(packet).save();
      await delCache(`user/${createdDoc._id}`);
      await delCache(`users`);
      return createdDoc;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  export const getUsers = async (): Promise<IUserDoc[]> => {
    try {
      let check = await getCache({ key: "users" });
      if (check) {
        return check;
      } else {
        let allUsers = await User.find({});
        await setCache({ key: "users", value: allUsers });
        return allUsers;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  export const getUserPosts = async (id: string): Promise<any> => {
    try {
      let check = await getCache({ key: `user/${id}/posts` });
      if (check) {
        return check;
      } else {
        let user = await Post.find({ user: id });
        await setCache({ key: `user/${id}/posts`, value: user });
        return user;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  export const getUser = async (id: string): Promise<IUserDoc> => {
    try {
      let check = await getCache({ key: `user/${id}` });
      if (check) {
        return check;
      } else {
        let user = await User.findById(id);
        await setCache({ key: `user/${id}`, value: user });
        return user;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  export const updateUser = async (
    id: string,
    packet: IUser
  ): Promise<IUserDoc> => {
    try {
      let user = await User.findByIdAndUpdate(id, packet, { new: true });
      await delCache(`user/${id}`);
      await delCache(`users`);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };
}

export default UserSpace;
