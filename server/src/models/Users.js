import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Your schema fields
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }]
  },
  { collection: "users" }
);

export const UserModel = mongoose.model("users", UserSchema);
