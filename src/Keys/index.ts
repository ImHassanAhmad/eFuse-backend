import dotenv from "dotenv";
import Ikeys from "../Interfaces/keys";
dotenv.config();
const Keys: Ikeys = {
  port: process.env.PORT ? process.env.PORT : "",
  mongoUri: process.env.MONGO_URI ? process.env.MONGO_URI : "",
};
export default Keys;
