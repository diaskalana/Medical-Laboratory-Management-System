import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import "./add-employee-style.css";
import { API_BASE_URL } from "../../../utils/constants";
import { PATHS } from "../../../utils/paths";

const AddEmployee = () => {
  const [state, setState] = useState({
    NIC: "",
    name: "",
    country: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    contactNo: "",
    type: "",
    salary: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { ...state };
    axios.post(`${API_BASE_URL}/staff/post`, data).then((res) => {
      if (res.data.success) {
        console.log(res.data.success._id);
        window.location.href = `${PATHS.staff}/EmployeeList`;
        setState({
          NIC: "",
          name: "",
          country: "",
          address: "",
          dateOfBirth: "",
          gender: "",
          contactNo: "",
          type: "",
          salary: "",
          password: "",
        });
      }
    });
  };

  const buttonStyle = {
    backgroundColor: "#545F71",
    color: "white",
  };

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ padding: "20px 0", width: "100%", maxWidth: "600px" }}>
          <a href={`${PATHS.staff}/EmployeeList`}>
            <button
              className="backBtn"
              color="primary"
              variant="contained"
              type="submit"
            >
              Employee List
            </button>
          </a>
        </Box>
        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="div">
              Add New Employee
            </Typography>
            <form
              onSubmit={onSubmit}
              className="form-container"
              style={{ height: "500px", overflow: "auto" }}
            >
              <TextField
                id="outlined-basic"
                label="NIC"
                variant="outlined"
                type="text"
                name="NIC"
                value={state.NIC}
                onChange={handleChange}
                required
                sx={{ width: "100%" }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="country"
                variant="outlined"
                type="text"
                name="country"
                value={state.country}
                onChange={handleChange}
                required
                sx={{ width: "100%" }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="NAME"
                variant="outlined"
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
                sx={{ width: "100%" }}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="ADDRESS"
                variant="outlined"
                type="text"
                name="address"
                value={state.address}
                onChange={handleChange}
                required
                sx={{ width: "100%" }}
              />
              <br />
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="date"
                name="dateOfBirth"
                value={state.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
                sx={{ width: "100%" }}
              />
              <br />
              <FormControl variant="outlined" required sx={{ width: "100%" }}>
                <InputLabel>GENDER</InputLabel>
                <Select
                  name="gender"
                  value={state.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <br />
              <TextField
                id="outlined-basic"
                label="NUMBER"
                variant="outlined"
                type="tel"
                name="contactNo"
                value={state.contactNo}
                onChange={handleChange}
                maxLength="10"
                required
                pattern="\d{10}"
                sx={{ width: "100%" }}
              />
              <br />
              <FormControl variant="outlined" required sx={{ width: "100%" }}>
                <InputLabel>TYPE</InputLabel>
                <Select
                  name="type"
                  value={state.type}
                  onChange={handleChange}
                  label="Type"
                >
                  <MenuItem value="ACCOUNTANT">ACCOUNTANT</MenuItem>
                  <MenuItem value="LAB MANAGER">LAB MANAGER</MenuItem>
                  <MenuItem value="MEDICAL ASSISTANT">
                    MEDICAL ASSISTANT
                  </MenuItem>
                  <MenuItem value="SCIENTIST">SCIENTIST</MenuItem>
                  <MenuItem value="NURSING ASSISTANT">
                    NURSING ASSISTANT
                  </MenuItem>
                  <MenuItem value="LAB TECHNICIAN">LAB TECHNICIAN</MenuItem>
                </Select>
              </FormControl>
              <br />
              <TextField
                id="outlined-basic"
                label="SALARY(Rs)"
                variant="outlined"
                type="number"
                name="salary"
                value={state.salary}
                onChange={handleChange}
                required
                min="30000"
                sx={{ width: "100%" }}
              />
              <br />
              <div className="button-container">
                <Button
                  variant="contained"
                  style={buttonStyle}
                  color="primary"
                  type="submit"
                >
                  Add Employee
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AddEmployee;
