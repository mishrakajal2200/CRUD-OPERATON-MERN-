import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ fetchTodos }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post("https://crud-operaton-mern-2.onrender.com/api/todos/add", { text });
    setText("");
    fetchTodos();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2 shadow-md"
    >
      <input
        type="text"
        value={text}
        placeholder="Enter a new task..."
        onChange={(e) => setText(e.target.value)}
        className="flex-1 bg-transparent outline-none px-2 text-gray-700 placeholder-gray-400"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
