import express from "express";
import User from "../../models/user.model";

export const removeFromCart = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { bookId } = req.body;
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

    const itemIndex = user.cart.items.findIndex(
      (item) => item.bookId._id.toString() === bookId
    );

    if (itemIndex === -1) {
      res.status(404).send("Item not found in cart");
      return;
    }

    const removedItemPrice =
      user.cart.items[itemIndex].weeks *
        user.cart.items[itemIndex].bookId.rentalPrice +
      user.cart.items[itemIndex].bookId.depositPrice;

    user.cart.items.splice(itemIndex, 1);

    user.cart.totalPrice -= removedItemPrice;

    if (user.cart.totalPrice < 0) {
      user.cart.totalPrice = 0;
    }

    user.cart.totalPrice = parseFloat(user.cart.totalPrice.toFixed(2));

    await user.save();

    res
      .status(200)
      .json({ cartItems: user.cart.items, totalPrice: user.cart.totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing item from cart");
  }
};
