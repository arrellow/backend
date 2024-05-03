import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";



export const userInfo = async (req, res, next) => {
    const {userId} = req.params
// const Id = req.userId


// if(Id != userId) return next(errorHandler(400, "forbidden route"))
 

  try {
    const user = await Prisma.user.findUnique({
      where: { id: userId }
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