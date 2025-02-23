import express from "express";
import { registerUser } from "../controllers/authControllers/auth.controller";
import { loginUser } from "../controllers/authControllers/login.controller";
import { getBooks } from "../controllers/cartControllers/book.controller";
import { addToCart } from "../controllers/cartControllers/addToCart.controller";
import { authenticate } from "../controllers/authControllers/authMiddleware";
import { getCart } from "../controllers/cartControllers/getCart.controller";
import { removeFromCart } from "../controllers/cartControllers/removeCartItem.controller";
import { updateItemWeeks } from "../controllers/cartControllers/updateWeeks.controller";
import { placeOrder } from "../controllers/borrowedControllers/order.controller";
import { getUserBorrowedBooks } from "../controllers/borrowedControllers/getBorrowedBooks.controller";
import { updateDiscount } from "../controllers/cartControllers/updateDiscount.controller";
import { stopRental } from "../controllers/borrowedControllers/stopRental.controller";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/books", getBooks);

router.post("/cart", authenticate, addToCart);

router.get("/get-cart", authenticate, getCart);

router.post("/update-weeks-cart", authenticate, updateItemWeeks);

router.post("/remove-cart", authenticate, removeFromCart);

router.post("/place-order", authenticate, placeOrder);

router.get("/get-borrowed-books", authenticate, getUserBorrowedBooks);

router.post("/update-discount", authenticate, updateDiscount);

router.post("/rental-stop", authenticate, stopRental);

export default router;
