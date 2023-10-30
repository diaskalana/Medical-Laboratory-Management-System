import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SideNavbar } from "./SideNavbar";
import { TopNavbar } from "./TopNavbar";

import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeList from "./components/EmployeeList";
import EmployeePreview from "./components/EmployeePreview";

export default class Staff extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" exact element={<EmployeeList />} />
        <Route path="/EmployeeList" exact element={<EmployeeList />} />
        <Route path="/AddEmployee" exact element={<AddEmployee />} />
        <Route path="/EditEmployee/:id" exact element={<EditEmployee />} />
        <Route path="/EmployeePreview" exact element={<EmployeePreview />} />
      </Routes>
    );
  }
}
