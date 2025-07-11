// import React, { useState, useEffect } from "react";
// import { Plus, Edit2, Trash2, Check, X } from "lucide-react";

// const TodoApp = () => {
//   const [todos, setTodos] = useState([]);
//   const [newTodoText, setNewTodoText] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editingText, setEditingText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // API base URL - replace with your actual backend URl
//   const API_BASE_URL = "http://localhost:5000/api/todos";

//   // Fetch todos from API
//   const fetchTodos = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch("http://localhost:5000/api/todos");
//       if (!response.ok) {
//         throw new Error("Failed to fetch todos");
//       }
//       const data = await response.json();
//       setTodos(data);
//     } catch (err) {
//       setError("Failed to load todos. Using local storage instead.");
//       // Fallback to localStorage for demo purposes
//       const localTodos = JSON.parse(localStorage.getItem("todos") || "[]");
//       setTodos(localTodos);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add new todo
//   const addTodo = async () => {
//     if (!newTodoText.trim()) return;

//     try {
//       const newTodo = {
//         id: Date.now(),
//         text: newTodoText.trim(),
//         completed: false,
//         createdAt: new Date().toISOString(),
//       };

//       const response = await fetch(API_BASE_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newTodo),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create todo");
//       }

//       const createdTodo = await response.json();
//       setTodos((prev) => [...prev, createdTodo]);
//       setNewTodoText("");
//     } catch (err) {
//       // Fallback to localStorage for demo purposes
//       const newTodo = {
//         id: Date.now(),
//         text: newTodoText.trim(),
//         completed: false,
//         createdAt: new Date().toISOString(),
//       };
//       const updatedTodos = [...todos, newTodo];
//       setTodos(updatedTodos);
//       localStorage.setItem("todos", JSON.stringify(updatedTodos));
//       setNewTodoText("");
//     }
//   };

//   // Update todo
//   const updateTodo = async (id, newText) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ text: newText }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update todo");
//       }

//       const updatedTodo = await response.json();
//       setTodos((prev) =>
//         prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
//       );
//       setEditingId(null);
//       setEditingText("");
//     } catch (err) {
//       // Fallback to localStorage for demo purposes
//       const updatedTodos = todos.map((todo) =>
//         todo.id === id ? { ...todo, text: newText } : todo
//       );
//       setTodos(updatedTodos);
//       localStorage.setItem("todos", JSON.stringify(updatedTodos));
//       setEditingId(null);
//       setEditingText("");
//     }
//   };

//   // Delete todo
//   const deleteTodo = async (id) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete todo");
//       }

//       setTodos((prev) => prev.filter((todo) => todo.id !== id));
//     } catch (err) {
//       // Fallback to localStorage for demo purposes
//       const updatedTodos = todos.filter((todo) => todo.id !== id);
//       setTodos(updatedTodos);
//       localStorage.setItem("todos", JSON.stringify(updatedTodos));
//     }
//   };

//   // Start editing
//   const startEditing = (id, text) => {
//     setEditingId(id);
//     setEditingText(text);
//   };

//   // Cancel editing
//   const cancelEditing = () => {
//     setEditingId(null);
//     setEditingText("");
//   };

//   // Save edit
//   const saveEdit = () => {
//     if (editingText.trim()) {
//       updateTodo(editingId, editingText.trim());
//     }
//   };

//   // Handle key press events
//   const handleKeyPress = (e, action) => {
//     if (e.key === "Enter") {
//       action();
//     }
//   };

//   // Load todos on mount
//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
//         <h1 className="text-3xl font-bold text-white mb-2">Todo App</h1>
//         <p className="text-blue-100">Organize your tasks efficiently</p>
//       </div>

//       {/* Add Todo Section */}
//       <div className="p-6 border-b border-gray-200">
//         <div className="flex gap-3">
//           <input
//             type="text"
//             value={newTodoText}
//             onChange={(e) => setNewTodoText(e.target.value)}
//             onKeyPress={(e) => handleKeyPress(e, addTodo)}
//             placeholder="What needs to be done?"
//             className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//           />
//           <button
//             onClick={addTodo}
//             disabled={!newTodoText.trim()}
//             className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
//           >
//             <Plus size={20} />
//             Add Todo
//           </button>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mx-6 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <p className="text-yellow-800 text-sm">{error}</p>
//         </div>
//       )}

//       {/* Todos List */}
//       <div className="divide-y divide-gray-200">
//         {todos.length === 0 ? (
//           <div className="p-12 text-center">
//             <div className="text-gray-400 mb-4">
//               <Plus size={48} className="mx-auto opacity-50" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-500 mb-2">
//               No todos yet
//             </h3>
//             <p className="text-gray-400">
//               Add your first todo above to get started!
//             </p>
//           </div>
//         ) : (
//           todos.map((todo) => (
//             <div
//               key={todo.id}
//               className="p-4 hover:bg-gray-50 transition-colors duration-200"
//             >
//               <div className="flex items-center gap-3">
//                 {editingId === todo.id ? (
//                   <>
//                     <input
//                       type="text"
//                       value={editingText}
//                       onChange={(e) => setEditingText(e.target.value)}
//                       onKeyPress={(e) => handleKeyPress(e, saveEdit)}
//                       className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       autoFocus
//                     />
//                     <button
//                       onClick={saveEdit}
//                       className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
//                       title="Save"
//                     >
//                       <Check size={20} />
//                     </button>
//                     <button
//                       onClick={cancelEditing}
//                       className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//                       title="Cancel"
//                     >
//                       <X size={20} />
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <span className="flex-1 text-gray-800 py-2">
//                       {todo.text}
//                     </span>
//                     <button
//                       onClick={() => startEditing(todo.id, todo.text)}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
//                       title="Edit"
//                     >
//                       <Edit2 size={18} />
//                     </button>
//                     <button
//                       onClick={() => deleteTodo(todo.id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
//                       title="Delete"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Footer */}
//       {todos.length > 0 && (
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
//           <p className="text-sm text-gray-600 text-center">
//             {todos.length} {todos.length === 1 ? "todo" : "todos"} total
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TodoApp;

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import "./TodoApp.css";

const TodoApp = () => {
  // State declarations
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api/todos";

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos. Using local storage instead.");
      const localTodos = JSON.parse(localStorage.getItem("todos") || "[]");
      setTodos(localTodos);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async () => {
    if (!newTodoText.trim()) return;

    try {
      const newTodo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) throw new Error("Failed to create todo");
      const createdTodo = await response.json();
      setTodos((prev) => [...prev, createdTodo]);
      setNewTodoText("");
    } catch (err) {
      const newTodo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setNewTodoText("");
    }
  };

  // Update todo
  const updateTodo = async (id, newText) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });

      if (!response.ok) throw new Error("Failed to update todo");
      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
      );
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setEditingId(null);
      setEditingText("");
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  // Edit handlers
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = () => {
    if (editingText.trim()) updateTodo(editingId, editingText.trim());
  };

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") action();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="todo-loading">
        <div className="todo-spinner"></div>
      </div>
    );
  }

  return (
    <div className="todo-app">
      {/* Header */}
      <div className="todo-header">
        <h1 className="todo-title">Todo App</h1>
        <p className="todo-subtitle">Organize your tasks efficiently</p>
      </div>

      {/* Add Todo Section */}
      <div className="todo-input-container">
        <div className="todo-input-group">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addTodo)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button
            onClick={addTodo}
            disabled={!newTodoText.trim()}
            className="todo-add-btn"
          >
            <Plus size={20} />
            Add Todo
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="todo-error">
          <svg
            className="todo-error-icon"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      {/* Todos List */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="todo-empty-state">
            <div className="todo-empty-icon">
              <Plus size={48} />
            </div>
            <h3 className="todo-empty-title">No todos yet</h3>
            <p className="todo-empty-text">
              Add your first todo above to get started!
            </p>
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <div className="todo-content">
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                      className="todo-edit-input"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="todo-action-btn todo-save-btn"
                      title="Save"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="todo-action-btn todo-cancel-btn"
                      title="Cancel"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <span className="todo-text">{todo.text}</span>
                    <div className="todo-actions">
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="todo-action-btn todo-edit-btn"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="todo-action-btn todo-delete-btn"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="todo-date">
                {new Date(todo.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {todos.length > 0 && (
        <div className="todo-footer">
          <p className="todo-count">
            {todos.length} {todos.length === 1 ? "todo" : "todos"} total
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="todo-back-top"
          >
            Back to top
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
