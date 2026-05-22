import { useState } from "react";

export default function Todos() {
  type Todo = {
    id: number;
    name: string;
    date: string;
    done: boolean;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  const [input, setInput] = useState("");
  const [date, setDate] = useState<string>("");

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center">
        Add a Todo Here
        {error && <p className="text-red-600 text-xl">{error}</p>}
        <label htmlFor="todoName">Todo Name</label>
        <input
          name="todoName"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Todo Name"
          className="border"
        />
        <label htmlFor="todoDate">Todo Date</label>
        <input
          name="todoDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          placeholder="Todo Date"
          className="border"
        />
        <button
          onClick={() => {
            if (!input || !date) {
              return setError("Name & Date cannot be empty.");
            }
            const todo = {
              id: Date.now(),
              name: input,
              date: date,
              done: false,
            };

            setTodos([...todos, todo]);
            setInput("");
            setError("");
          }}
          className="rounded-lg w-fit border-2 border-gray-700 px-4"
        >
          Add Todo
        </button>
      </div>
      <ul>
        Todos List
        {todos.map((t) => (
          <li key={t.id} className={t.done ? "line-through" : ""}>
            {t.name + " " + t.date + t.done}
            <button
              onClick={() =>
                setTodos(
                  todos.map((d) =>
                    t.id === d.id ? { ...t, done: !t.done } : d,
                  ),
                )
              }
            >
              Mark as done
            </button>
            <button
              onClick={() => setTodos(todos.filter((f) => f.id !== t.id))}
            >
              Remove todo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
