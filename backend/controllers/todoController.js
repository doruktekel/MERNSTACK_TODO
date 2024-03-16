import ToDo from "../models/todoModel.js";
import asyncHandler from "express-async-handler";

const createTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await ToDo.create(req.body);
    res.status(201).send(todo);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getAllTodo = asyncHandler(async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.status(200).send(todos);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getTodo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await ToDo.findById(id);
    if (!todo) {
      res.status(404);
      throw new Error("Tod was not found");
    }
    res.status(200).send(todo);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await ToDo.findByIdAndDelete(id);
    if (!todo) {
      res.status(404);
      throw new Error("Tod was not found");
    }
    res.status(200).json({ message: "Item was deleted succesfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateTodo = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await ToDo.findByIdAndUpdate(id, req.body);
    if (!todo) {
      res.status(404);
      throw new Error("Tod was not found");
    }
    res.status(200).json({ message: "Todo was updated succes" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export { createTodo, getAllTodo, getTodo, updateTodo, deleteTodo };
