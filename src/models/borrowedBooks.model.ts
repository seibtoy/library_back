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

/**
 * @swagger
 * components:
 * schemas:
 * BorrowedBook:
 * type: object
 * properties:
 * _id:
 * type: string
 * description: The unique ID of the borrowed book record.
 * userId:
 * type: string
 * description: The ID of the user who borrowed the books.
 * books:
 * type: array
 * items:
 * type: object
 * properties:
 * bookId:
 * type: string
 * description: The ID of the borrowed book.
 * userQuantity:
 * type: number
 * description: The quantity of the book borrowed by the user.
 * default: 1
 * weeks:
 * type: number
 * description: The number of weeks the book is borrowed for.
 * rentalDate:
 * type: string
 * format: date-time
 * description: The date when the book was rented.
 * returnDate:
 * type: string
 * format: date-time
 * description: The date when the book is due to be returned.
 * totalPrice:
 * type: number
 * description: The total price of the borrowed books.
 * required:
 * - userId
 * - books
 * - totalPrice
 */

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
