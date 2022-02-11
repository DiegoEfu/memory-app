import express from "express";
import { getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost, searchPosts } from "../controllers/posts.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", searchPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;