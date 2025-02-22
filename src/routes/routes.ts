import express from "express";
import { registerUser } from "../controllers/authControllers/authController";
import { loginUser } from "../controllers/authControllers/loginController";
import { getBooks } from "../controllers/cartControllers/bookController";
import { addToCart } from "../controllers/cartControllers/addToCartController";
import { authenticate } from "../controllers/authControllers/authMiddleware";
import { getCart } from "../controllers/cartControllers/getCartController";
import { removeFromCart } from "../controllers/cartControllers/removeCartItemController";
import { updateItemWeeks } from "../controllers/cartControllers/updateWeeksController";
import { placeOrder } from "../controllers/borrowedControllers/orderController";
import { getUserBorrowedBooks } from "../controllers/borrowedControllers/getBorrowedBooks";
import { updateDiscount } from "../controllers/cartControllers/updateDiscount";
import { stopRental } from "../controllers/borrowedControllers/stopRental";

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

router.post("/stop-rental", authenticate, stopRental);

export default router;
