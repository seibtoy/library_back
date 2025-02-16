import express, { Request, Response } from "express";
import { registerUser } from "../controllers/authController";
import { loginUser } from "../controllers/loginController";
import { getBooks } from "../controllers/bookController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/books", getBooks);

export default router;
