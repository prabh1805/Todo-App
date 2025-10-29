import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const API_URL = "http://localhost:8080/api/todos";

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo.title.trim()) return;
    try {
      const res = await axios.post(API_URL, {
        title: newTodo.title,
        description: newTodo.description,
        completed: false,
      });
      setTodos((prev) => [...prev, res.data]);
      setNewTodo({ title: "", description: "" });
      setShowAddPopup(false);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}/status?completed=true`);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo
        )
      );
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 2500);
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 drop-shadow-sm">
        🌸 Elegant Todo List
      </h1>

      {/* Add Todo Button */}
      <button
        onClick={() => setShowAddPopup(true)}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl shadow-lg mb-10 transition-all duration-300"
      >
        + Add Todo
      </button>

      {/* Todo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="backdrop-blur-lg bg-white/70 border border-gray-200/50 rounded-2xl shadow-md p-6 flex flex-col justify-between h-64 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <h2
                className={`text-lg font-semibold mb-2 ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 break-words">
                {todo.description || "No description provided."}
              </p>
            </div>

            <div className="flex justify-between mt-auto">
              <button
                onClick={() => handleComplete(todo.id)}
                disabled={todo.completed}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 ${
                  todo.completed
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md"
                }`}
              >
                {todo.completed ? "Done" : "Complete"}
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-medium shadow-md transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Todo Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center backdrop-blur-sm z-50">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-96 max-w-[90%] animate-fadeIn border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              ✨ Add New Todo
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/60"
            />
            <textarea
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/60"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddPopup(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTodo}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Congrats Message */}
      {showCongrats && (
        <div className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl transition-opacity duration-500 animate-fadeIn">
          🎉 Great job! You’re making progress!
        </div>
      )}
    </div>
  );
};

export default App;
