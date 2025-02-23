import express from "express";
import User from "../../models/user.model";

export const updateDiscount = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { discount } = req.body;
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

    user.cart.discount = discount;

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
      user.cart.totalPrice = user.cart.totalPrice * (1 - discount / 100);
    } else {
      user.cart.totalPrice = 0;
    }

    user.cart.totalPrice = parseFloat(user.cart.totalPrice.toFixed(2));

    await user.save();

    res.status(200).json({
      cartItems: user.cart.items,
      totalPrice: user.cart.totalPrice,
      discount: user.cart.discount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating discount");
  }
};
