import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";



export const postInfo = async (req, res, next) => {
    const {prodId} = req.params

  try {
    const data = await Prisma.project.findUnique({
      where: { id: prodId }
    });

    if (!data) {
      return next(errorHandler(401, "Invalid listing!"))
    }


    res
      .status(201)
      .json({ status: "successfully", data });
  } catch (error) {
    next(error);
  }
};