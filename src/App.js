import { useEffect, useState } from "react";
import { Trash2, Plus, Edit3, CheckCircle2 } from "lucide-react";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (text.trim()) {
      if (editId) {
        setTodos(todos.map(todo => todo.id === editId ? { ...todo, text } : todo));
        setEditId(null);
      } else {
        setTodos([...todos, { id: Date.now(), text, done: false }]);
      }
      setText("");
    }
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === "active") return !todo.done;
      if (filter === "done") return todo.done;
      return true;
    })
    .sort((a, b) => a.done - b.done);

  return (
    <div className="bg-pink-100 text-gray-800 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-6 border-[3px] border-dashed border-pink-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold tracking-wide text-pink-600">To Do</h1>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow p-2 rounded-xl border border-pink-300 focus:outline-none"
            placeholder="Write a task..."
          />
          <button
            onClick={addTodo}
            className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded-xl"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex justify-between mb-3 text-sm">
          {[
            ["all", "All"],
            ["active", "Active"],
            ["done", "Done"]
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-full font-medium ${
                filter === key
                  ? "bg-pink-300 text-white"
                  : "text-pink-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center border rounded-xl p-3 transition-all ${
                todo.done
                  ? "bg-gray-200 border-gray-400"
                  : "bg-pink-50 border-pink-200"
              }`}
            >
              <div
                onClick={() => toggleDone(todo.id)}
                className="flex items-center gap-2 cursor-pointer flex-grow"
              >
                {todo.done && <CheckCircle2 className="text-gray-600" size={18} />}
                <span
                  className={`font-medium ${todo.done ? "line-through text-gray-500" : "text-gray-800"}`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditId(todo.id);
                    setText(todo.text);
                  }}
                  className="text-pink-400 hover:text-pink-600"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-pink-400 hover:text-pink-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}