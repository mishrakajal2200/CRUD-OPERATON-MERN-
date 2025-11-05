import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/todos/get");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📝 MERN To-Do App
        </h1>

        <TodoForm fetchTodos={fetchTodos} />

        <div className="mt-6">
          <TodoList todos={todos} fetchTodos={fetchTodos} />
        </div>
      </div>

      <footer className="text-white text-sm mt-6">
        Made with ❤️ by <span className="font-semibold">Kajal Mishra</span>
      </footer>
    </div>
  );
};

export default App;
