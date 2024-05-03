import { Prisma } from "../../lib/prisma.js";

export const posts = async (req, res, next) => {

  try {
    const data = await Prisma.project.findMany();

    res
      .status(201)
      .json({ status: "successfully", data });
  } catch (error) {
    next(error);
  }
};