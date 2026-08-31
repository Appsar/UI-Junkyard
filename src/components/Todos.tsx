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
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-6 mb-5 text-4xl font-bold text-green-800">
        Welcome to the Todo Page!
      </h1>

      <div className="flex flex-col w-[40%] justify-center">
        Add a Todo Here!
        {error && <p className="text-red-600 text-xl">{error}</p>}
        <label htmlFor="todoName">Name</label>
        <input
          name="todoName"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Todo Name"
          className="border rounded-xl p-1"
        />
        <label htmlFor="todoDate">Date</label>
        <input
          name="todoDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          placeholder="Todo Date"
          className="border rounded-xl p-1"
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
          className="mt-5 rounded-lg w-fit border-2 border-gray-700 px-4"
        >
          Add to list
        </button>
      </div>
      <ul className="flex flex-col p-2 mt-10 border-2 rounded-xl  ">
        Todo List
        {todos.map((t) => (
          <li key={t.id} className={t.done ? "line-through" : ""}>
            {t.name + "  " + t.date}
            <button
              className="ml-4"
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
              className="ml-4"
              onClick={() => setTodos(todos.filter((f) => f.id !== t.id))}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
