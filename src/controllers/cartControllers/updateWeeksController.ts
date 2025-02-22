import express from "express";
import User from "../../models/userModel";
import Book from "../../models/bookModel"; // Импортируем модель Book

export const updateItemWeeks = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { bookId, weeks } = req.body;
  const userId = req.userId;

  try {
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

    const cartItem = user.cart.items.find(
      (item) => item.bookId._id.toString() === bookId
    );

    if (!cartItem) {
      res.status(404).send("Item not found in cart");
      return;
    }

    cartItem.weeks = weeks;

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

    await user.save();

    res.status(200).json({
      message: "Cart item updated",
      cartItem,
      totalPrice: user.cart.totalPrice,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating cart item");
  }
};
