import express from "express";
import User from "../../models/userModel";
import Book from "../../models/bookModel";

export const addToCart = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { bookId } = req.body;
  const userId = req.userId;
  try {
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).send("Book not found");
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const existingItemIndex = user.cartItems.findIndex(
      (item) => item.bookId.toString() === bookId
    );

    if (existingItemIndex === -1) {
      user.cartItems.push({ bookId, weeks: 1 });
    } else {
      res.send("Book already exist");
      return;
    }

    await user.save();

    const total = user.cartItems.reduce((total, item) => {
      return total + item.weeks * book.rentalPrice;
    }, 0);

    res.status(200).json({ cartItems: user.cartItems, total });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
