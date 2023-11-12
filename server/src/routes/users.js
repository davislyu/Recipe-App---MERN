import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.status(409).json({ message: "User already exists!" })
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username: username, password: hashedPassword })
    await newUser.save()
    res.json({ message: "User registered successfuly" });
  } catch (error) {
    res.status(401).json({ message: "There was an error creating this user. make sure you provide a username and a password" })

  }

});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username })

  if (!user) {
    return res.status(410).json({ message: "User doesnt exist!" })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(410).json({ message: "Username or Password Is Incorrect!" })
  }
  const token = jwt.sign({ id: user._id }, "secret")
  res.json({ token, userID: user._id })
})

export { router as userRouter };
