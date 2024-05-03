import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";



export const users = async (req, res, next) => {
    // const {userId} = req.params
// const Id = req.userId


// if(Id != userId) return next(errorHandler(400, "forbidden route"))
 

  try {
    const user = await Prisma.user.findMany();

    if (!user) {
      return errorHandler(401, "Invalid credentials!");
    }

    let datas = []
    const response = user.forEach(v => {

        const {password, ...res} = v
        datas.push(res)

    })
   

    res
      .status(201)
      .json({ status: "successfully", data: datas });
  } catch (error) {
    next(error);
  }
};