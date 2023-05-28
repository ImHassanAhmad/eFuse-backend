import express from "express";
import cors from "cors";
import User from "./Models/user.model";
import Keys from "./Keys";
import user from "./Routes/user.route";
import post from "./Routes/post.route";
import mongoose, { ConnectOptions } from "mongoose";

const { port, mongoUri } = Keys;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", user);
app.use("/api/post", post);

app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("DB connection established");
    seed();
  } catch (error) {
    console.error("error connecting to the database", error);
  }
});

async function seed() {
  let users = await User.find({});
  if (users?.length == 0) {
    await new User({
      email: "hassan.ahmad.otaku@gmail.com",
      userName: "hassan.ahmad.otaku@gmail.com",
      firstName: "hassan",
      lastName: "ahmad",
    }).save();
  }
}
