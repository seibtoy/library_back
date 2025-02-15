import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });

  if (!user) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
};
