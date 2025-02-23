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
