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

const bookSchema = new Schema<Book>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    depositPrice: { type: Number, required: true },
    rentalPrice: { type: Number, required: true },
    currency: { type: String, required: true },
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

const Book = mongoose.model<Book>("Books", bookSchema);
export default Book;
