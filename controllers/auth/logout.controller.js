import { errorHandler } from "../../utils/error.utils.js"

export const logout = (req, res, next) => {
    const response = res.status(200).clearCookie("login").json({message: "user logout successfully"})
    if(!response) {
        return next(errorHandler(500, "logout failed"));
    }
}