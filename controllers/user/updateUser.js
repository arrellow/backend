import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";

export const updateUser = async (req, res, next) => {
    const {userId} = req.params
// const Id = req.userId

const { 
    avatar,
    phone_number,
    username
} = req.body


// if(Id != userId) return next(errorHandler(400, "forbidden route"))


  try {
    const user = await Prisma.user.update({
      where: { id: userId },
      data: {
       ...( avatar && {avatar} ),
       ...( phone_number && {phone_number}) ,
       ...(username && {username} )
      }
    });



    if (!user) {
      return errorHandler(401, "Invalid credentials!");
    }

    delete user.password

    res
      .status(201)
      .json({ status: "successfully", data: user });
  } catch (error) {
    next(error);
  }
};