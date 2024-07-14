import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParserq from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["POST", "PUT", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
// connect to mongodb
mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });
