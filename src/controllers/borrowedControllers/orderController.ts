import express from "express";
import User from "../../models/userModel";
import BorrowedBook from "../../models/borrowedBooksModel";
import mongoose from "mongoose";

interface PopulatedCartItem {
  bookId: {
    _id: mongoose.Types.ObjectId;
    title: string;
    author: string;
    rentalPrice: number;
  };
  weeks: number;
  quantity: number;
}

export const placeOrder = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId)
      .populate<{
        cart: {
          items: PopulatedCartItem[];
          totalPrice: number;
          discount: number;
        };
      }>("cart.items")
      .exec();

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const borrowedBook = new BorrowedBook({
      userId: user._id,
      books: user.cart.items.map((item) => {
        const rentalDate = new Date();
        const returnDate = new Date(rentalDate);
        returnDate.setDate(rentalDate.getDate() + item.weeks * 7);

        return {
          bookId: item.bookId._id,
          title: item.bookId.title,
          author: item.bookId.author,
          rentalPrice: item.bookId.rentalPrice,
          weeks: item.weeks,
          quantity: 1,
          rentalDate,
          returnDate,
        };
      }),
      totalPrice: user.cart.totalPrice,
    });

    await borrowedBook.save();

    user.cart.items = [];
    await user.save();

    res.status(200).json({
      message: "Order placed successfully",
      borrowedBook: borrowedBook.toObject(),
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).send("Internal server error");
  }
};
