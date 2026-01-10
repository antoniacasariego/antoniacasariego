
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import WorkDetail from "./pages/WorkDetail.tsx"; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/work/:slug" element={<WorkDetail />} />
    </Routes>
  );
}
