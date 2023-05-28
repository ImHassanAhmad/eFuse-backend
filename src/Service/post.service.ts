import Post from "../Models/post.model";
import { IPost, IPostDoc } from "../Interfaces/post.interfaces";
import { setCache, getCache, delCache } from "../Cache/checkCache";

namespace UserSpace {
  export const createPost = async (packet: IPost): Promise<any> => {
    try {
      let createdDoc = await new Post(packet).save();
      await delCache(`post/${createdDoc._id}`);
      await delCache(`posts`);
      return createdDoc;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  export const getPosts = async (): Promise<any> => {
    try {
      let check = await getCache({ key: "posts" });
      if (check) {
        return check;
      } else {
        let user = await Post.find({});
        await setCache({ key: "posts", value: user });
        return user;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  export const getPost = async (id: string): Promise<any> => {
    try {
      let check = await getCache({ key: `post/${id}` });
      if (check) {
        return check;
      } else {
        let user = await Post.findById(id);
        await setCache({ key: `post/${id}`, value: user });
        return user;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  export const updateUser = async (id: string, packet: IPost): Promise<any> => {
    try {
      let user = await Post.findByIdAndUpdate(id, packet, { new: true });
      await delCache(`post/${id}`);
      await delCache(`posts`);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };
}

export default UserSpace;
