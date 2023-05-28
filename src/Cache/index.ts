import * as redis from "redis";

const client = redis.createClient({
  url: "redis://redis:6379",
});
client.on("connect", () => console.log("Connected to Redis!"));
client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

export default client;
