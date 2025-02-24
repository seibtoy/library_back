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
import { getTransactions } from "../controllers/transactionControllers/getTransaction.controller";

const router = express.Router();

/**
 * @swagger
 * /register:
 * post:
 * summary: User registration
 * tags: [Authentication]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name: string
 * last name: string
 * midname: string
 * phone:
 * address: string
 * type: string
 * password: string
 * type: string
 * responses:
 * 201:
 * description: User registered successfully
 * 500:
 * description: Error registering user
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /login:
 * post:
 * summary: User login
 * tags: [Authentication]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * phone:
 * type: string
 * password: string
 * type: string
 * responses:
 * 400:
 * description: Invalid email or password
 * 500:
 * description: Login successful
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /books:
 * get:
 * summary: Get books list
 * tags: [Books]
 * responses:
 * 200:
 * description: json().
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Book'
 * 500:
 * description: Error fetching books.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: "Error fetching books: "
 * error:
 * type: object
 * description: Errors object.
 */
router.get("/books", getBooks);

/**
 * @swagger
 * /cart:
 * post:
 * summary: Add a book to the user's cart
 * tags: [Cart]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * bookId:
 * type: string
 * description: The ID of the book to add to the cart.
 * responses:
 * 200:
 * description: Book added to cart successfully. Returns the updated cart items and total price.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * cartItems:
 * type: array
 * items:
 * type: object
 * properties:
 * bookId:
 * $ref: '#/components/schemas/Book'
 * weeks:
 * type: number
 * description: The number of weeks the book is rented for.
 * totalPrice:
 * type: number
 * description: The total price of the items in the cart.
 * 400:
 * description: Book already exists in the cart.
 * 404:
 * description: Book or User not found.
 * 500:
 * description: Internal server error.
 */
router.post("/cart", authenticate, addToCart);

/**
 * @swagger
 * /get-cart:
 * get:
 * summary: Get the user's cart
 * tags: [Cart]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: User's cart items retrieved successfully.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * bookId:
 * $ref: '#/components/schemas/Book'
 * weeks:
 * type: number
 * description: The number of weeks the book is rented for.
 * 401:
 * description: Unauthorized - missing or invalid authentication token.
 * 404:
 * description: User not found.
 * 500:
 * description: Internal server error - failed to fetch cart.
 */
router.get("/get-cart", authenticate, getCart);

/**
 * @swagger
 * /update-weeks-cart:
 * post:
 * summary: Update the number of weeks for a book in the user's cart
 * tags: [Cart]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * bookId:
 * type: string
 * description: The ID of the book in the cart to update.
 * weeks:
 * type: number
 * description: The new number of weeks for the book.
 * responses:
 * 200:
 * description: Cart item updated successfully.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: "Cart item updated"
 * cartItem:
 * type: object
 * properties:
 * bookId:
 * $ref: '#/components/schemas/Book'
 * weeks:
 * type: number
 * description: The updated number of weeks.
 * totalPrice:
 * type: number
 * description: The updated total price of the cart.
 * 401:
 * description: Unauthorized - missing or invalid authentication token.
 * 404:
 * description: User or cart item not found.
 * 500:
 * description: Internal server error - failed to update cart item.
 */
router.post("/update-weeks-cart", authenticate, updateItemWeeks);

/**
 * @swagger
 * /remove-cart:
 * post:
 * summary: Remove a book from the user's cart
 * tags: [Cart]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * bookId:
 * type: string
 * description: The ID of the book to remove from the cart.
 * responses:
 * 200:
 * description: Book removed from cart successfully. Returns the updated cart items and total price.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * cartItems:
 * type: array
 * items:
 * type: object
 * properties:
 * bookId:
 * $ref: '#/components/schemas/Book'
 * weeks:
 * type: number
 * description: The number of weeks the book was rented for.
 * totalPrice:
 * type: number
 * description: The updated total price of the items in the cart.
 * 401:
 * description: Unauthorized - missing or invalid authentication token.
 * 404:
 * description: User or cart item not found.
 * 500:
 * description: Internal server error - failed to remove item from cart.
 */
router.post("/remove-cart", authenticate, removeFromCart);

/**
 * @swagger
 * /place-order:
 * post:
 * summary: Place an order based on the user's cart
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Order placed successfully. Returns the borrowed book details.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: "Order placed successfully"
 * borrowedBook:
 * $ref: '#/components/schemas/BorrowedBook'
 * 401:
 * description: Unauthorized - missing or invalid authentication token.
 * 404:
 * description: User not found.
 * 500:
 * description: Internal server error - failed to place order.
 */
router.post("/place-order", authenticate, placeOrder);

/**
 * @swagger
 * /get-borrowed-books:
 * get:
 * summary: Get the user's borrowed books
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: User's borrowed books retrieved successfully.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/BorrowedBook'
 * 401:
 * description: Unauthorized - missing or invalid authentication token.
 * 500:
 * description: Internal server error - failed to fetch borrowed books.
 */
router.get("/get-borrowed-books", authenticate, getUserBorrowedBooks);

/**
 * @swagger
 * /update-discount:
 * post:
 * summary: Update the discount for the user's cart
 * tags: [Cart]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * discount:
 * type: number
 * description: The new discount percentage.
 * responses:
 * 200:
 * description: Discount updated successfully. Returns the updated cart items, total price, and discount.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * cartItems:
 * type: array
 * items:
 * type: object
 * properties:
 * bookId:
 * $ref: '#/components/schemas/Book'
 * weeks:
 * type: number
 * description: The number of weeks the book is rented for.
 * totalPrice:
 * type: number
 * description: The updated total price of the items in the cart.
 * discount:
 * type: number
 * description: The updated discount percentage.
 * 401:
 * description: Unauthorized - missing or invalid authentication token.
 * 404:
 * description: User not found.
 * 500:
 * description: Internal server error - failed to update discount.
 */
router.post("/update-discount", authenticate, updateDiscount);

/**
 * @swagger
 * /rental-stop:
 * post:
 * summary: Stop the rental of a book from a borrowed book record
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * borrowedBookId:
 * type: string
 * description: The ID of the borrowed book record.
 * bookId:
 * type: string
 * description: The ID of the book to stop renting.
 * userId:
 * type: string
 * description: The ID of the user.
 * clientPaid:
 * type: number
 * description: The amount the client paid.
 * refundAmount:
 * type: number
 * description: The amount to refund to the client.
 * depositPrice:
 * type: number
 * description: The deposit price of the book.
 * responses:
 * 200:
 * description: Rental stopped successfully. Returns the updated borrowed book record or a message if the order was deleted.
 * content:
 * application/json:
 * schema:
 * oneOf:
 * - $ref: '#/components/schemas/BorrowedBook'
 * - type: object
 * properties:
 * message:
 * type: string
 * example: "Order deleted successfully"
 * 401:
 * description: Unauthorized - missing or invalid authentication token.
 * 404:
 * description: Order, book, or full book info not found.
 * 500:
 * description: Internal server error - failed to stop rental.
 */
router.post("/rental-stop", authenticate, stopRental);

/**
 * @swagger
 * /transactions:
 * get:
 * summary: Get all transactions
 * tags: [Transactions]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: A list of transactions retrieved successfully.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Transaction'
 * 401:
 * description: Unauthorized - missing or invalid authentication token.
 * 500:
 * description: Internal server error - failed to fetch transactions.
 */
router.get("/transactions", authenticate, getTransactions);

export default router;
