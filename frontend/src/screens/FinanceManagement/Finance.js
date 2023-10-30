import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function Finance() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem("Lab-Management-User")) {
    return props.children;
  } else {
    return <Navigate to="login" />;
  }
}

export default Finance;
