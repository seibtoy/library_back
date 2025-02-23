import mongoose, { Schema, Document } from "mongoose";
import Book from "./book.model";

interface BorrowedBook extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  books: Array<{
    bookId: mongoose.Schema.Types.ObjectId;
    userQuantity: number;
    weeks: number;
    rentalDate: Date;
    returnDate: Date;
  }>;
  totalPrice: number;
}

const borrowedBookSchema = new Schema<BorrowedBook>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
      userQuantity: { type: Number, default: 1, required: true },
      weeks: { type: Number, required: true },
      rentalDate: { type: Date, required: true },
      returnDate: { type: Date, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
});

const BorrowedBook = mongoose.model<BorrowedBook>(
  "BorrowedBook",
  borrowedBookSchema,
  "borrowedBooks"
);
export default BorrowedBook;
