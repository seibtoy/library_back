import express from "express";
import User from "../models/userModel";

export const removeFromCart = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { bookId } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const itemIndex = user.cartItems.findIndex(
      (item) => item.bookId.toString() === bookId
    );

    if (itemIndex === -1) {
      res.status(404).send("Item not found in cart");
      return;
    }

    user.cartItems.splice(itemIndex, 1);
    await user.save();

    res.status(200).json(user.cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing item from cart");
  }
};
