import { Request, Response } from "express";
import transactionModel from "../../models/transaction.model";

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactions = await transactionModel.find();
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching transactions");
  }
};
