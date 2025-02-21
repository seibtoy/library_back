import express, { Request, Response } from "express";
import Book from "../../models/bookModel";

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books: ", error: err });
  }
};
