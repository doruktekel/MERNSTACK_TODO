import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/todoRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;
const CONNECTION_DB_STRING = process.env.CONNECTION_DB_STRING;
const FRONTEND = process.env.FRONTEND;

const corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200,
};

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome the todo list" });
});

app.use("/todos", router);

app.use(errorMiddleware);

mongoose
  .connect(CONNECTION_DB_STRING)
  .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => {
      console.log(`Port ${PORT} is listening`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
