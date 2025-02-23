import express from "express";
import BorrowedBook from "../../models/borrowedBooks.model";

export const getUserBorrowedBooks = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const userId = req.userId;

  try {
    const borrowedBooks = await BorrowedBook.find({ userId: req.userId })
      .populate({
        path: "books.bookId",
        select:
          "title author genre depositPrice rentalPrice currency availability imageLink language pages country year quantity",
      })
      .exec();

    res.status(200).json(borrowedBooks);
  } catch (error) {
    console.error("Error fetching borrowed books", error);
    res.status(500).send("Error fetching borrowed books");
  }
};
