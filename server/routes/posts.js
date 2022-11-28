import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//read
//route to get posts from your feed, needs a verify token, will use getFeedPost controller
//route to get/see users own posts also needs verifyToken, will use getUserPost controller
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//update
// like a post, will use likePost controller.
router.patch("/:id/like", verifyToken, likePost);

export default router;