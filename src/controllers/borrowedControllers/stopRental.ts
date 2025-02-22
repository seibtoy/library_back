import express from "express";
import BorrowedBook from "../../models/borrowedBooksModel";
import Book from "../../models/bookModel";

export const stopRental = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { borrowedBookId, bookId } = req.body;

  try {
    const borrowedBook = await BorrowedBook.findById(borrowedBookId);

    if (!borrowedBook) {
      res.status(404).send("Order not found");
      return;
    }

    const bookIndex = borrowedBook.books.findIndex(
      (book: any) => book.bookId.toString() === bookId
    );

    if (bookIndex === -1) {
      res.status(404).send("Book not found in order");
      return;
    }

    const removedBook = borrowedBook.books[bookIndex];

    const fullBookInfo = await Book.findById(removedBook.bookId);

    if (!fullBookInfo) {
      res.status(404).send("Full book info not found");
      return;
    }

    const removedBookPrice =
      fullBookInfo.rentalPrice * removedBook.weeks + fullBookInfo.depositPrice;

    borrowedBook.totalPrice = parseFloat(
      (borrowedBook.totalPrice - removedBookPrice).toFixed(2)
    );

    borrowedBook.books.splice(bookIndex, 1);

    if (borrowedBook.books.length === 0) {
      await BorrowedBook.findByIdAndDelete(borrowedBookId);
      res.status(200).json({ message: "Order deleted successfully" });
      return;
    }

    await borrowedBook.save();

    res.status(200).json(borrowedBook);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error stopping rental");
  }
};
