import React, { Component } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { API_BASE_URL } from "../../../../utils/constants";

function withParams(Component) {
  return (props) => <Component params={useParams()} />;
}

export class UpdatePayroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payrollData: {},
      id: "",
      name: "",
      endingDate: "",
      grossPay: "",
      startingDate: "",
      paymentDate: "",
      totalHours: "",
    };
  }

  getIdFromURL = () => {
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split("/");
    const _id = pathParts[pathParts.length - 1];
    return _id;
  };

  componentDidMount() {
    const _id = this.getIdFromURL();
    console.log(_id);
    axios
      .get(`${API_BASE_URL}/payroll/get/${_id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          this.setState({
            payrollData: res.data,
            id: res.data.payroll.id,
            name: res.data.payroll.name,
            endingDate: res.data.payroll.endingDate,
            grossPay: res.data.payroll.grossPay,
            startingDate: res.data.payroll.startingDate,
            paymentDate: res.data.payroll.paymentDate,
            totalHours: res.data.payroll.totalHours,
          });
          console.log("After setting name in state:", this.state.name);
        }
      })
      .catch((error) => {
        console.error("Error fetching payroll data:", error);
      });
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleUpdate = async () => {
    try {
      const {
        id,
        name,
        endingDate,
        grossPay,
        startingDate,
        paymentDate,
        totalHours,
      } = this.state;
      const updatedPayroll = {
        id,
        name,
        endingDate,
        grossPay,
        startingDate,
        paymentDate,
        totalHours,
      };
      const _id = this.getIdFromURL();

      const response = await axios.put(
        `${API_BASE_URL}/payroll/update/${_id}`,
        updatedPayroll
      );
      if (response.data.success) {
        alert("Payroll updated successfully");
        setTimeout(() => {
          window.location.href = `payroll`;
        }, 2500);
      } else {
        alert("Failed to update payroll data");
      }
    } catch (error) {
      console.error("Error updating payroll data:", error);
    }
  };

  render() {
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
                Edit Payroll Data
              </Typography>
              <form
                className="form-container"
                onSubmit={this.handleUpdate}
                style={formContainerStyle}
              >
                <TextField
                  id="outlined-basic"
                  label="ID"
                  variant="outlined"
                  type="text"
                  name="id"
                  value={this.state.id}
                  onChange={this.handleChange}
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
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Name"
                  style={inputStyle}
                />

                <TextField
                  id="outlined-basic"
                  label="Ending Date"
                  variant="outlined"
                  type="date"
                  name="endingDate"
                  value={this.state.endingDate}
                  onChange={this.handleChange}
                  style={inputStyle}
                />

                <TextField
                  id="outlined-basic"
                  label="Gross Pay"
                  variant="outlined"
                  type="number"
                  name="grossPay"
                  value={this.state.grossPay}
                  onChange={this.handleChange}
                  required
                  style={inputStyle}
                />

                <TextField
                  id="outlined-basic"
                  label="Starting Date"
                  variant="outlined"
                  type="date"
                  name="startingDate"
                  value={this.state.startingDate}
                  onChange={this.handleChange}
                  style={inputStyle}
                />

                <TextField
                  id="outlined-basic"
                  label="Payment Date"
                  variant="outlined"
                  type="date"
                  name="paymentDate"
                  value={this.state.paymentDate}
                  onChange={this.handleChange}
                  style={inputStyle}
                />

                <TextField
                  id="outlined-basic"
                  label="Total Hours"
                  variant="outlined"
                  type="number"
                  name="totalHours"
                  value={this.state.totalHours}
                  onChange={this.handleChange}
                  required
                  style={inputStyle}
                />

                <div className="button-container" style={buttonStyle}>
                  <Button variant="contained" color="primary" type="submit">
                    Update Payroll Data
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }
}

export default withParams(UpdatePayroll);
