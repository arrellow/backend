import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";

export const updatePost = async (req, res, next) => {
    const {userId, prodId} = req.params
const Id = req.userId

const { 
    
} = req.body


if(Id != userId) return next(errorHandler(400, "forbidden route"))


  try {

   
    const data = await Prisma.project.update({
      where: { id: prodId },
      data: {
      //  ...( avatar && {avatar} ),
      //  ...( phone_number && {phone_number}) ,
      //  ...(username && {username} )
      }
    });


    if (!data) {
      return next(errorHandler(401, "project not found!"));
    }


    res
      .status(201)
      .json({ status: "successfully", data });
  } catch (error) {
    next(error);
  }
};