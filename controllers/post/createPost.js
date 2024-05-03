import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";

export const createPost = async (req, res, next) => {
    const {userId} = req.params
const Id = req.userId

const { 
    
} = req.body


if(Id != userId) return next(errorHandler(400, "forbidden route"))


  try {

   
    const project = await Prisma.project.create({
      data: {
        userId
      //  ...( avatar && {avatar} ),
      //  ...( phone_number && {phone_number}) ,
      //  ...(username && {username} )
      }
    });


    if (!project) {
      return next(errorHandler(401, "failed to create project"))
    }


    res
      .status(201)
      .json({ status: "successfully", data: project });
  } catch (error) {
    next(error);
  }
};