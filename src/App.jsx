import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Initialize state with localStorage values if they exist
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  
  const [newItem, setNewItem] = useState("");

  // Keep localStorage in sync whenever the todos array updates
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  // Handle Form Submission
  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.trim() === "") return;

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });

    setNewItem(""); // Clear the input field
  }

  // Toggle Checkbox Status
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  // Delete Todo Item
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div className="container">
      <header className="header">
        <h1>My Tasks</h1>
        <p>Stay organized and get things done.</p>
      </header>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
            placeholder="What needs to be done?"
            maxLength={60}
          />
          <button className="btn-add" type="submit">Add Task</button>
        </div>
      </form>

      {/* Todo List Display */}
      <h2 className="section-title">Todo List ({todos.filter(t => !t.completed).length} remaining)</h2>
      <ul className="list">
        {todos.length === 0 && <li className="empty-message">No tasks yet! Add one above.</li>}
        {todos.map((todo) => {
          return (
            <li key={todo.id} className={`list-item ${todo.completed ? "completed" : ""}`}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                <span className="todo-text">{todo.title}</span>
              </label>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="btn-delete"
                aria-label={`Delete ${todo.title}`}
              >
                ✕
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
