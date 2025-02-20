import express from "express";
import User from "../models/userModel";

export const getCart = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("cartItems.bookId");

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).json(user.cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cart");
  }
};
