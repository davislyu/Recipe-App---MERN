

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);



mongoose.connect("mongodb+srv://davislyu:322590720@recipes.lzyr12l.mongodb.net/recipes")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));






app.listen(3001, () => console.log("Server started"));