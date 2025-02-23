import mongoose, { Schema, Document } from "mongoose";
import Book from "./book.model";

interface CartItem {
  bookId: mongoose.Schema.Types.ObjectId;
  weeks: number;
}

interface Cart {
  items: CartItem[];
  discount: number;
  totalPrice: number;
}

interface User extends Document {
  name: string;
  surname: string;
  midname: string;
  phone: string;
  address: string;
  password: string;
  cart: Cart;
}

const cartSchema = new Schema<Cart>({
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      weeks: { type: Number, default: 1 },
    },
  ],
  discount: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
});

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  midname: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    type: cartSchema,
    default: { items: [], discount: 0, totalPrice: 0 },
  },
});

const User = mongoose.model<User>("User", userSchema, "user");
export default User;
