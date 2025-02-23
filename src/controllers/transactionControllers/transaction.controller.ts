import transactionModel from "../../models/transaction.model";
import mongoose from "mongoose";
import { generateTransactionId } from "../../utils/generateTransactionId";

export const createTransaction = async (
  userId: mongoose.Types.ObjectId,
  bookId: mongoose.Types.ObjectId,
  clientPaid: number,
  refundAmount: number,
  depositPrice: number
): Promise<void> => {
  try {
    const transaction = new transactionModel({
      transactionId: generateTransactionId(),
      userId: userId,
      bookId: bookId,
      returnDate: new Date(),
      clientPaid: clientPaid,
      refundAmount: refundAmount,
      depositPrice: depositPrice,
      profit: (clientPaid - refundAmount).toFixed(2),
    });

    await transaction.save();
  } catch (err) {
    console.error(err);
    throw new Error("Error creating transaction");
  }
};
