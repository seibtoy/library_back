"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/myDatabase";
app.use(express_1.default.json());
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));
app.get("/", (req, res) => {
    res.send("Hello from TypeScript Express!");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
