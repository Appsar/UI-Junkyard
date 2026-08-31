import { Route, Routes } from "react-router";

import TodoPage from "./pages/TodoPage";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";
import TimerPage from "./pages/TimerPage";
import BMICalculator from "./pages/BMIPage";

export default function MainPage() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app/todo" element={<TodoPage />} />
      <Route path="/fakeweb/weather" element={<WeatherPage />} />
      <Route path="/app/timer" element={<TimerPage />} />
      <Route path="/app/bmi" element={<BMICalculator />} />
    </Routes>
  );
}
