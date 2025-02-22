import express from "express";
import User from "../../models/userModel";
import Book from "../../models/bookModel";

export const addToCart = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { bookId } = req.body;
    const userId = req.userId;

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).send("Book not found");
      return;
    }

    const user = await User.findById(userId)
      .populate<{
        cart: {
          items: {
            bookId: { _id: string; rentalPrice: number; depositPrice: number };
            weeks: number;
          }[];
          totalPrice: number;
          discount: number;
        };
      }>("cart.items.bookId")
      .exec();

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const itemIndex = user.cart.items.findIndex(
      (item) => item.bookId?._id.toString() === bookId
    );

    if (itemIndex === -1) {
      user.cart.items.push({ bookId, weeks: 1 });
      await user.save();
    } else {
      res.status(400).send("Book already exist");
      return;
    }

    await user.populate({
      path: "cart.items.bookId",
      model: "Book",
      select: "_id title rentalPrice depositPrice",
    });

    if (user.cart.items.length > 0) {
      user.cart.totalPrice = parseFloat(
        user.cart.items
          .reduce((total, item) => {
            return (
              total +
              item.weeks * item.bookId.rentalPrice +
              item.bookId.depositPrice
            );
          }, 0)
          .toFixed(2)
      );
    } else {
      user.cart.totalPrice = 0;
    }

    await user.save();

    res
      .status(200)
      .json({ cartItems: user.cart.items, totalPrice: user.cart.totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
