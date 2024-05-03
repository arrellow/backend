import express from "express";
import {register} from "../controllers/auth/register.controller.js"
import {login} from "../controllers/auth/login.controller.js"
import {logout} from "../controllers/auth/logout.controller.js"
import { verifyUser } from "../middlewares/authorization.js";
import { changepassword } from "../controllers/auth/changePassword.js";

const router = express.Router()

router.post("/register", register)

router.post("/login", login)

router.post("/logout", logout)

router.patch("/change-password/:userId", verifyUser, changepassword)



export default router;