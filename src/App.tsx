import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkDetail from "./pages/WorkDetail";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/work/:slug" element={<WorkDetail />} />
    </Routes>
  );
}
