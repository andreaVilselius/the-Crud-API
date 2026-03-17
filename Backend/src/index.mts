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
/*
app.use(
  cors({
    origin: "http://localhost:5173",
   
  }),
);*/
const allowedOrigins = [
  "http://localhost:5173",
  "https://the-crud-api-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // tillåt t.ex. Postman eller curl
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "CORS-policy: Denna origin är inte tillåten.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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
