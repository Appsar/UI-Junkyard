import { Route, Routes } from "react-router";

import TodoPage from "./pages/TodoPage";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";

export default function MainPage() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/app/todo" element={<TodoPage />} />
      <Route path="/fakeweb/weather" element={<WeatherPage />} />
    </Routes>
  );
}
