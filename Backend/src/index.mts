import express, { json } from "express";

import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import { OrderRouter } from "./routers/OrderRouter.mjs";

config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI || "";

if (MONGO_URL === "") {
  throw Error("No valid mongo url is in .env");
}
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use("/orders", OrderRouter);
app.listen(PORT, async (error) => {
  if (error) console.error(error);
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.error(error);
  }
  console.log("Api is running on port " + PORT);
});
