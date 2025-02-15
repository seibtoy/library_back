import express, { Request, Response } from "express";
import { registerUser } from "../controllers/authController";
import { loginUser } from "../controllers/loginController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
