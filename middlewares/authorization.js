import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.utils.js"

export const verifyUser = async(req, res, next) => {
    const token = req.cookies.login

    const {userId} = req.params
   
    
    
    
   
 

    if(!token) {
        return next(errorHandler(401, "Not Authenticated"))
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload) => {
        if(err) {
            return next(errorHandler(403, "Token not valid"))
        }


        if(payload.id != userId) {
            return next(errorHandler(400, "forbidden route"))
        } else {
            req.userId = payload.id
            if(payload.isAdmin) {
                req.isAdmin = payload.isAdmin
            }
            next()
        }


    })

}

export const verifyAdmin = async(req, res, next) => {
    const token = req.cookies.token

    if(!token) {
        return next(errorHandler(401, "Not Authenticated"))
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload) => {
        if(err) {
            return next(errorHandler(403, "Token not valid"))
        }

        if(!payload.isAdmin){
            return next(errorHandler(401, "Not Authenticated"))
        }

        

        if(payload.id != userId) {
            return next(errorHandler(400, "forbidden route"))
        } else {
            req.userId = payload.id
        req.isAdmin = payload.isAdmin
            next()
        }

    })


}