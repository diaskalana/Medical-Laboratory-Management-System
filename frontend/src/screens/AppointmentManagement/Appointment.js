import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

/**
 * importing app screens
 */
import { AddAppoinment } from "./screens/appoinment/AddAppoinment";
import { ViewAppoinment } from "./screens/appoinment/ViewAppoinment";
import { EditAppoinment } from "./screens/appoinment/EditAppoinment";
/**
 * main application function
 * @returns App
 */
function Appointment() {
  return (
    <Routes>
      <Route path="/" element={<ViewAppoinment />} />
      <Route path="/add" element={<AddAppoinment />} />
      <Route path="/update/:id" element={<EditAppoinment />} />
    </Routes>
  );
}
export default Appointment;
