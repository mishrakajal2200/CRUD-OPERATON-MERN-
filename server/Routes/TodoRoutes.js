import express from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../Controllers/TodoController.js";

const router = express.Router();

router.get("/get", getTodos);
router.post("/add", addTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
