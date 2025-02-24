import mongoose, { Schema, Document } from "mongoose";

interface ITransaction extends Document {
  transactionId: string;
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  returnDate: Date;
  clientPaid: number;
  depositPrice: number;
  refundAmount: number;
  profit: number;
}

/**
 * @swagger
 * components:
 * schemas:
 * Transaction:
 * type: object
 * properties:
 * _id:
 * type: string
 * description: The unique ID of the transaction.
 * transactionId:
 * type: string
 * description: The unique transaction ID.
 * userId:
 * type: string
 * description: The ID of the user involved in the transaction.
 * bookId:
 * type: string
 * description: The ID of the book involved in the transaction.
 * returnDate:
 * type: string
 * format: date-time
 * description: The date when the book was returned.
 * clientPaid:
 * type: number
 * description: The amount paid by the client.
 * depositPrice:
 * type: number
 * description: The deposit price of the book.
 * refundAmount:
 * type: number
 * description: The amount refunded to the client.
 * default: 0
 * profit:
 * type: number
 * description: The profit from the transaction.
 * required:
 * - transactionId
 * - userId
 * - bookId
 * - returnDate
 * - clientPaid
 * - depositPrice
 * - profit
 */

const TransactionSchema: Schema = new Schema({
  transactionId: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  returnDate: { type: Date, required: true },
  clientPaid: { type: Number, required: true },
  depositPrice: { type: Number, required: true },
  refundAmount: { type: Number, default: 0 },
  profit: { type: Number, required: true },
});

export default mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema,
  "transactions"
);
