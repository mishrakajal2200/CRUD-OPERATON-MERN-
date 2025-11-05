import React, { useState } from "react";
import axios from "axios";

const TodoList = ({ todos, fetchTodos }) => {
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

 

  const toggleComplete = async (todo) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/api/todos/get${todo._id}`, {
      completed: !todo.completed,
      text: todo.text,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://crud-operaton-mern-2.onrender.com/api/todos/delete/${id}`);
    fetchTodos();
  };

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setUpdatedText(todo.text);
  };

  const handleUpdate = async (id) => {
    if (!updatedText.trim()) return;
    await axios.put(`https://crud-operaton-mern-2.onrender.com/api/todos/update/${id}`, {
      text: updatedText,
    });
    setEditingTodo(null);
    fetchTodos();
  };

  return (
    <ul className="space-y-3">
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks yet. Add one!</p>
      ) : (
        todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3 hover:shadow-md transition-all"
          >
            {editingTodo === todo._id ? (
              <input
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-2 py-1 outline-none"
              />
            ) : (
              <span
                onClick={() => toggleComplete(todo)}
                className={`cursor-pointer text-lg ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800 hover:text-indigo-600"
                }`}
              >
                {todo.text}
              </span>
            )}

            <div className="flex items-center gap-2">
              {editingTodo === todo._id ? (
                <button
                  onClick={() => handleUpdate(todo._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-all"
                >
                  ✅
                </button>
              ) : (
                <button
                  onClick={() => startEditing(todo)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition-all"
                >
                  ✏️
                </button>
              )}

              <button
                onClick={() => deleteTodo(todo._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
              >
                ❌
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default TodoList;
