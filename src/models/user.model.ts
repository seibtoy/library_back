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

/**
 * @swagger
 * components:
 * schemas:
 * User:
 * type: object
 * properties:
 * _id:
 * type: string
 * description: The unique ID of the user.
 * name:
 * type: string
 * description: The user's first name.
 * surname:
 * type: string
 * description: The user's last name.
 * midname:
 * type: string
 * description: The user's middle name.
 * phone:
 * type: string
 * description: The user's phone number.
 * address:
 * type: string
 * description: The user's address.
 * password:
 * type: string
 * description: The user's password.
 * cart:
 * type: object
 * properties:
 * items:
 * type: array
 * items:
 * type: object
 * properties:
 * bookId:
 * type: string
 * description: The ID of the book in the cart.
 * weeks:
 * type: number
 * description: The number of weeks the book is in the cart.
 * default: 1
 * discount:
 * type: number
 * description: The discount applied to the cart.
 * default: 0
 * totalPrice:
 * type: number
 * description: The total price of the items in the cart.
 * default: 0
 * required:
 * - name
 * - surname
 * - midname
 * - phone
 * - address
 * - password
 */

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
