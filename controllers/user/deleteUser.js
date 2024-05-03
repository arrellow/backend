import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";


export const deleteUser = async (req, res, next) => {
    const {userId} = req.params
// const Id = req.userId

// if(Id != userId) return next(errorHandler(400, "forbidden route"))

  try {
    const user = await Prisma.user.delete({
      where: { id: userId },
    });


    res
      .status(201)
      .json({ status: "deleted successfully",});
  } catch (error) {
    next(error);
  }
};