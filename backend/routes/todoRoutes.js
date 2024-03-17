import express from "express";
const router = express.Router();
import {
  getAllTodo,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  deleteAllTodo,
} from "../controllers/todoController.js";

router.post("/", createTodo);

router.get("/", getAllTodo);

router.delete("/", deleteAllTodo);

router.get("/:id", getTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);

export default router;
