import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddPayroll } from "./screens/payroll/AddPayroll";
import { ViewPayroll } from "./screens/payroll/ViewPayroll";
import { UpdatePayroll } from "./screens/payroll/UpdatePayroll";
const Payroll = () => {
  return (
    <Routes>
      <Route path="/" element={<ViewPayroll />} />
      <Route path="/add" element={<AddPayroll />} />
      <Route path="/update/:id" element={<UpdatePayroll />} />
    </Routes>
  );
};

export default Payroll;
