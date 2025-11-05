import Todo from "../models/TodoModels.js";

export const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

export const addTodo = async (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({ text });
  await newTodo.save();
  res.json(newTodo);
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const updated = await Todo.findByIdAndUpdate(id, { text, completed }, { new: true });
  res.json(updated);
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo deleted" });
};
