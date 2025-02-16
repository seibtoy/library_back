import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  name: string;
  surname: string;
  midname: string;
  phone: string;
  address: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  midname: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<User>("User", userSchema, "user");
export default User;
