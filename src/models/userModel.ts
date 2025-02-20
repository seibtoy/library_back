import mongoose, { Schema, Document } from "mongoose";
import Book from "./bookModel";

interface CartItem {
  bookId: mongoose.Schema.Types.ObjectId;
  weeks: number;
}

interface User extends Document {
  name: string;
  surname: string;
  midname: string;
  phone: string;
  address: string;
  password: string;
  cartItems: CartItem[];
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  midname: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  cartItems: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      weeks: { type: Number, default: 1 },
    },
  ],
});

const User = mongoose.model<User>("User", userSchema, "user");
export default User;
