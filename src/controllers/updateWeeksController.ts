import express from "express";
import User from "../models/userModel";

export const updateItemWeeks = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { bookId, weeks } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const cartItem = user.cartItems.find(
      (item) => item.bookId.toString() === bookId
    );
    if (!cartItem) {
      res.status(404).send("Item not found in cart");
      return;
    }

    cartItem.weeks = weeks;
    await user.save();

    res.status(200).json({ message: "Cart item updated", cartItem });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating cart item");
  }
};
