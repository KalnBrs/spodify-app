import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./logino";
import Dashboard from "./dashboard";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;