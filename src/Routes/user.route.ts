import express from "express";
import {
  getUsers,
  getUser,
  getUserPosts,
  createUser,
  updateUser,
} from "../Controllers/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/:id/posts", getUserPosts);
router.post("/", createUser);
router.patch("/:id", updateUser);

export default router;
