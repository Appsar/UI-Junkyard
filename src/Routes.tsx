import { Route, Routes } from "react-router";

import TodoPage from "./pages/TodoPage";
import HomePage from "./pages/HomePage";

export default function MainPage() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todo" element={<TodoPage />} />
    </Routes>
  );
}
