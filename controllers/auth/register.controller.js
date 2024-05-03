import bcrypt from "bcrypt"
import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";

export const register = async(req, res, next) => {
    const {username, password, email, phone_number, avatar} = req.body;

    try {

        const user = await Prisma.user.findUnique({
            where: {email}
        })



        if(user) {
            return next(errorHandler(401, "email already exist"))
        }


        const hashPassdword = await bcrypt.hash(password, 10)
    
     await Prisma.user.create({
        data: {
            email,
            password: hashPassdword,
            phone_number,
            username,
            avatar: avatar ? avatar : "",
    
        }
    })

    res.status(201).json({status: "user was created successfully",})
        
    } catch (error) {
        next(errorHandler(500, "Failed to register user"))
        
    }


    

}