import { useEffect, useState } from "react";

export function Timer() {
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [running]);

  function handleReset() {
    setTimer(0);
    setRunning(false);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-18">
      <h1 className="text-5xl underline text-lime-700 font-bold">Timer</h1>
      <p className="text-6xl font-mono text-slate-950 my-2">{timer}</p>

      <div className="flex gap-4">
        {!running ? (
          <button
            className="px-6 py-2 bg-lime-600 hover:bg-lime-700 text-white text-2xl font-semibold rounded-xl shadow-sm transition-colors"
            onClick={() => setRunning(true)}
          >
            Start
          </button>
        ) : (
          <button
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white text-2xl font-semibold rounded-xl shadow-sm transition-colors"
            onClick={() => setRunning(false)}
          >
            Pause
          </button>
        )}

        <button
          className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-2xl font-semibold rounded-xl shadow-sm transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
