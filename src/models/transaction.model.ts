import mongoose, { Schema, Document } from "mongoose";

interface ITransaction extends Document {
  transactionId: string;
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  returnDate: Date;
  returnAmount: number;
  damageAmount: number;
  totalAmount: number;
}

const TransactionSchema: Schema = new Schema({
  transactionId: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  returnDate: { type: Date, required: true },
  returnAmount: { type: Number, required: true },
  damageAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
});

export default mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema,
  "transactions"
);
