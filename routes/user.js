import express from "express";
import { verifyAdmin, verifyUser } from "../middlewares/authorization.js";
import { userInfo } from "../controllers/user/userInfo.js";
import { updateUser } from "../controllers/user/updateUser.js";
import { deleteUser } from "../controllers/user/deleteUser.js";
import { users } from "../controllers/user/users.js";

const router = express.Router()

router.get("/:userId", verifyUser, verifyAdmin, users)
router.get("/info/:userId", verifyUser, userInfo)
router.patch("/update/:userId", verifyUser, updateUser)
router.delete("/delete/:userId", verifyUser, deleteUser)



export default router;