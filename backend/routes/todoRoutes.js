import express from "express";
const router = express.Router();
import {
  getAllTodo,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoController.js";

router.post("/", createTodo);

router.get("/", getAllTodo);

router.get("/:id", getTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);

export default router;
