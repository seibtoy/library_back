import express from "express";
import { registerUser } from "../controllers/authController";
import { loginUser } from "../controllers/loginController";
import { getBooks } from "../controllers/bookController";
import { addToCart } from "../controllers/addToCartController";
import { authenticate } from "../controllers/authMiddleware";
import { getCart } from "../controllers/getCartController";
import { removeFromCart } from "../controllers/removeCartItemController";
import { updateItemWeeks } from "../controllers/updateWeeksController";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/books", getBooks);

router.post("/cart", authenticate, addToCart);

router.get("/get-cart", authenticate, getCart);

router.post("/update-weeks-cart", authenticate, updateItemWeeks);

router.post("/remove-cart", authenticate, removeFromCart);

export default router;
