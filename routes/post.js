import express from "express";
import { verifyUser } from "../middlewares/authorization.js";
import { postInfo } from "../controllers/post/postInfo.js";
import { updatePost } from "../controllers/post/updatePost.js";
import { deletePost } from "../controllers/post/deletePost.js";
import { posts } from "../controllers/post/posts.js";
import { createPost } from "../controllers/post/createPost.js";

const router = express.Router()

router.get("/", posts)
router.get("/info/:prodId", postInfo)
router.post("/create/:userId", verifyUser, createPost)
router.patch("/update/:userId/:prodId", verifyUser, updatePost)
router.get("/delete/:userId/:prodId", verifyUser, deletePost)



export default router;