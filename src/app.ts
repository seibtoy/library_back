import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const MONGO_URI: string =
  process.env.MONGO_URI || "mongodb://localhost:27017/myDatabase";

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
