import express from "express";
import User from "./routes/user.js"
import Post from "./routes/post.js"
import Auth from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", Auth)
app.use("/api/user", User)
app.use("/api/post", Post)



app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data })
})



app.listen(8080, () => {
    console.log("inn")

})