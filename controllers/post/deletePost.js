import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";


export const deletePost = async (req, res, next) => {
    const {userId, prodId} = req.params
const Id = req.userId
 const isAdmin =   req.isAdmin 

// if(Id != userId) return next(errorHandler(400, "forbidden route"))


  try {

  const deletproject = await Prisma.project.findUnique({
      where: { id: prodId},
    });

    if (deletproject.userId !== userId || !isAdmin) {
      return next(errorHandler(401, "You are not authorise"))
    }



  const project = await Prisma.project.delete({
      where: { id: prodId},
    });


    if (!project) {
      return next(errorHandler(401, "failed to delete project"))
    }


    res
      .status(201)
      .json({ status: "deleted successfully",});
  } catch (error) {
    next(error);
  }
};