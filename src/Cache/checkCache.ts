import redisClient from "./index";
import empty from "is-empty";

const getCache = async (params) => {
  const { key } = params;
  try {
    const result = await redisClient.get(key);
    if (!empty(result)) {
      return JSON.parse(result);
    } else {
      return false;
    }
  } catch (error) {
    console.log("error while getting cache", error);
    return false;
  }
};

const setCache = async (params) => {
  let { key, value, timeout } = params;
  if (empty(timeout)) {
    timeout = 60 * 60 * 24 * 30 * 365 * 60;
  }
  // console.log(`Cache ${key}:"`, value)

  if (value) {
    value = JSON.stringify(value);
    try {
      await redisClient.set(key, value);
      await redisClient.expire(key, timeout);
      return true;
    } catch (error) {
      console.log("error while setting cache", error);
      return false;
    }
  }
};

const delCache = async (key) => {
  redisClient
    .del(key)
    .then(() => {})
    .catch((error) => {
      console.error("Error deleting key:", error);
    });
};

export { getCache, setCache, delCache };
