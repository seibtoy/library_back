import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/userModel";

export const registerUser = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { name, surname, midname, phone, address, password } = req.body;

  const existingUser = await User.findOne({ phone });
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    surname,
    midname,
    phone,
    address,
    password: hashedPassword,
    cart: [],
  });

  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};
