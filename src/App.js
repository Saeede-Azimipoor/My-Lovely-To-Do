import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim()) {
      setTodos([...todos, { id: Date.now(), text }]);
      setText("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-6 border-[3px] border-dashed border-pink-300">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center tracking-wider">To Do</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow p-2 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Write a task..."
          />
          <button
            onClick={addTodo}
            className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded-xl flex items-center justify-center"
          >
            <Plus size={20} />
          </button>
        </div>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-pink-50 border border-pink-200 rounded-xl p-3 shadow-sm hover:shadow-md transition"
            >
              <span className="text-pink-700 font-medium">{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)} className="text-pink-400 hover:text-pink-600">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}