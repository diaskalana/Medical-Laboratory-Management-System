import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { API_BASE_URL } from "../../../../utils/constants";

export const AddPayroll = () => {
  const [payrollData, setPayrollData] = useState({
    id: "",
    name: "",
    endingDate: "",
    grossPay: 0,
    startingDate: "",
    paymentDate: "",
    totalHours: 0,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayrollData({ ...payrollData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/payroll/add`,
        payrollData
      );

      if (response.data.success) {
        navigate("/payroll");
      } else {
        alert("Failed to add payroll data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding payroll data");
    }
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    width: "100%",
    marginBottom: "15px",
    padding: "10px",
  };

  const dateInputStyle = {
    width: "100%",
    marginBottom: "15px",
    padding: "15px 10px",
    marginTop: "5px", // Add margin to separate date fields
  };

  const buttonStyle = {
    marginTop: "15px",
  };

  const cardStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  };

  return (
    <Container className="container">
      <br></br>
      <Box>
        <Card className="card" style={cardStyle}>
          <CardContent>
            <Typography variant="h5" component="div">
              Add Payroll Data
            </Typography>
            <form
              className="form-container"
              onSubmit={handleSubmit}
              style={formContainerStyle}
            >
              <TextField
                id="outlined-basic"
                label="ID"
                variant="outlined"
                type="text"
                name="id"
                value={payrollData.id}
                onChange={handleInputChange}
                placeholder="ID"
                required
                style={inputStyle}
              />

              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                type="text"
                name="name"
                value={payrollData.name}
                onChange={handleInputChange}
                placeholder="Name"
                style={inputStyle}
              />

              <TextField
                id="outlined-basic"
                label="Payment Date"
                variant="outlined"
                type="date"
                name="paymentDate"
                value={payrollData.paymentDate}
                onChange={handleInputChange}
                style={dateInputStyle}
              />

              <TextField
                id="outlined-basic"
                label="Gross Pay"
                variant="outlined"
                type="number"
                name="grossPay"
                value={payrollData.grossPay}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              <TextField
                id="outlined-basic"
                label="Starting Date"
                variant="outlined"
                type="date"
                name="startingDate"
                value={payrollData.startingDate}
                onChange={handleInputChange}
                style={dateInputStyle}
              />

              <TextField
                id="outlined-basic"
                label="Ending Date"
                variant="outlined"
                type="date"
                name="endingDate"
                value={payrollData.endingDate}
                onChange={handleInputChange}
                style={dateInputStyle}
              />



              <TextField
                id="outlined-basic"
                label="Total Hours"
                variant="outlined"
                type="number"
                name="totalHours"
                value={payrollData.totalHours}
                onChange={handleInputChange}
                required
                style={inputStyle}
              />

              <div className="button-container" style={buttonStyle}>
                <Button variant="contained" color="primary" type="submit">
                  Add Payroll Data
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
