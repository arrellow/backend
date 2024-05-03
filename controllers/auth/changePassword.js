import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";
import bcrypt from "bcrypt";


export const changepassword = async (req, res, next) => {
   
  const { oldPassword, email , newpassword} = req.body;
  const {userId} = req.params
  const Id = req.userId
  
  
  if(Id != userId) return next(errorHandler(400, "forbidden route"))

  console.log( oldPassword, email , newpassword)

  try {
    const user = await Prisma.user.findUnique({
      where: { email },
    });
   

    if(!user) {
      return errorHandler(401, "Invalid credentials!");
    }

    const pwd = await bcrypt.compare(oldPassword, user.password);
   

    if(!pwd) {
      return next(errorHandler(401, "Invalid credentials!"));
    }
    console.log("change", pwd)

    const hashPassdword = await bcrypt.hash(newpassword, 10)
    await Prisma.user.update({
        where: { email , id: userId},
        data: {password: hashPassdword}
      });
  

    res
      .status(201)
      .json({ status: "password changed successfully", });
  } catch (error) {
    next(error);
  }
};
