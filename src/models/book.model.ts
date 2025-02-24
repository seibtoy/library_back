import mongoose, { Schema, Document } from "mongoose";

interface Book extends Document {
  title: string;
  author: string;
  genre: string;
  depositPrice: number;
  rentalPrice: number;
  currency: string;
  availability: string;
  imageLink: string;
  language: string;
  pages: number;
  country: string;
  year: number;
  quantity: number;
}

/**
 * @swagger
 * components:
 * schemas:
 * Book:
 * type: object
 * properties:
 * _id:
 * type: string
 * description: The unique ID of the book.
 * title:
 * type: string
 * description: The title of the book.
 * author:
 * type: string
 * description: The author of the book.
 * genre:
 * type: string
 * description: The genre of the book.
 * depositPrice:
 * type: number
 * description: The deposit price of the book.
 * rentalPrice:
 * type: number
 * description: The rental price of the book.
 * currency:
 * type: string
 * description: The currency used for prices (e.g., USD).
 * default: "USD"
 * availability:
 * type: string
 * enum: ["available", "reserved"]
 * description: The availability status of the book.
 * imageLink:
 * type: string
 * description: The link to the book's image.
 * language:
 * type: string
 * description: The language of the book.
 * pages:
 * type: number
 * description: The number of pages in the book.
 * country:
 * type: string
 * description: The country of publication.
 * year:
 * type: number
 * description: The year of publication.
 * quantity:
 * type: number
 * description: The quantity of books available.
 * required:
 * - title
 * - author
 * - genre
 * - depositPrice
 * - rentalPrice
 * - currency
 * - availability
 * - imageLink
 * - language
 * - pages
 * - country
 * - year
 * - quantity
 */

const bookSchema = new Schema<Book>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    depositPrice: { type: Number, required: true },
    rentalPrice: { type: Number, required: true },
    currency: { type: String, required: true, default: "USD" },
    availability: {
      type: String,
      enum: ["available", "reserved"],
      required: true,
    },
    imageLink: { type: String, required: true },
    language: { type: String, required: true },
    pages: { type: Number, required: true },
    country: { type: String, required: true },
    year: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { collection: "books" }
);

const Book = mongoose.model<Book>("Book", bookSchema, "books");
export default Book;
