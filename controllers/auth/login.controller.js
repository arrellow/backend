import { Prisma } from "../../lib/prisma.js";
import { errorHandler } from "../../utils/error.utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    const user = await Prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorHandler(401, "Invalid credentials!");
    }

    const pwd = await bcrypt.compare(password, user.password);

    if (!pwd) {
      return errorHandler(401, "Invalid credentials!");
    }

    const maxAge = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: maxAge }
    );

    const {password: newpassword, ...other} = user
    res
      .cookie("login", token, {
        httpOnly: true,
        secure: true,
        maxAge,
      })
      .status(201)
      .json({ status: "login successfully", data: other });
  } catch (error) {
    next(error);
  }
};
