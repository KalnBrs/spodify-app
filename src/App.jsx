import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login.jsx";
import Dashboard from "./dashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;