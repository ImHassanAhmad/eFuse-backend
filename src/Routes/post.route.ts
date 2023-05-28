import express from "express";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
} from "../Controllers/post.controller";

const router = express.Router();

router.get("/:id", getPost);
router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);

export default router;
