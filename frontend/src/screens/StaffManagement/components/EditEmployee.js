import "./add-employee-style.css";
import React, { Component } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./form.css";
import Swal from "sweetalert2";
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
import { API_BASE_URL } from "../../../utils/constants";
import { PATHS } from "../../../utils/paths";

function withParams(Component) {
  return (props) => <Component params={useParams()} />;
}

class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      employee: {},
      NIC: "",
      name: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      contactNo: "",
      type: "",
      salary: "",
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    const id = this.state.id;
    axios.get(`${API_BASE_URL}/staff/post/${id}`).then((res) => {
      console.log(res.data.post);
      if (res.data.success) {
        this.setState({
          employee: res.data.post,
          NIC: res.data.post.NIC,
          name: res.data.post.name,
          address: res.data.post.address,
          dateOfBirth: res.data.post.dateOfBirth,
          gender: res.data.post.gender,
          contactNo: res.data.post.contactNo,
          type: res.data.post.type,
          salary: res.data.post.salary,
        });
        console.log(this.state.employee);
      }
    });
  }

  // Edit
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const id = this.state.id;

    const { NIC, name, address, dateOfBirth, gender, contactNo, type, salary } =
      this.state;

    const updatedEmployee = {
      NIC,
      name,
      address,
      dateOfBirth,
      gender,
      contactNo,
      type,
      salary,
    };

    axios
      .put(`${API_BASE_URL}/staff/post/${id}`, updatedEmployee)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Updated Successfully!",
            text: "Your changes have been saved.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          });
          setTimeout(() => {
            window.location.href = `/staff/EmployeeList`;
          }, 2500);
        } else {
          alert("Update Failed");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred during the update.");
      });
  };

  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`${API_BASE_URL}/staff/post/${id}`).then((res) => {
        alert("Delete Successfully");
      });
    }
  };

  render() {
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
              <button className="backBtn">Employee List</button>
            </a>
          </Box>

          <Card className="card">
            <CardContent>
              <Typography variant="h5" component="div">
                Update Employee
              </Typography>
              <br />
              <form
                className="form-container"
                onSubmit={this.onSubmit}
                style={{ height: "500px", overflow: "auto" }}
              >
                <TextField
                  id="outlined-basic"
                  label="NIC"
                  variant="outlined"
                  type="text"
                  name="NIC"
                  value={this.state.NIC}
                  onChange={this.handleChange}
                  placeholder="NIC"
                  required
                  sx={{ width: "100%" }}
                />
                <br />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Name"
                  sx={{ width: "100%" }}
                />
                <br />
                <br />

                <TextField
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  type="text"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                  placeholder="Address"
                  sx={{ width: "100%" }}
                />
                <br />
                <br />

                <TextField
                  id="outlined-basic"
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  name="dateOfBirth"
                  value={this.state.dateOfBirth}
                  onChange={this.handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  sx={{ width: "100%" }}
                />
                <br />
                <br />

                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleChange}
                    label="Gender"
                  >
                    <MenuItem value="">--Select Gender--</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                <br />
                <br />

                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  type="tel"
                  name="contactNo"
                  value={this.state.contactNo}
                  onChange={this.handleChange}
                  maxLength="10"
                  required
                  pattern="\d{}"
                  sx={{ width: "100%" }}
                />
                <br />
                <br />

                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={this.state.type}
                    onChange={this.handleChange}
                    label="Type"
                  >
                    <MenuItem value="">--Select Type--</MenuItem>
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
                <br />

                <TextField
                  id="outlined-basic"
                  label="Salary (Rs.)"
                  variant="outlined"
                  type="number"
                  name="salary"
                  value={this.state.salary}
                  onChange={this.handleChange}
                  required
                  min="30000"
                  sx={{ width: "100%" }}
                />
                <br />
                <br />

                <div className="button-container">
                  <Button
                    variant="contained"
                    style={buttonStyle}
                    color="primary"
                    type="submit"
                  >
                    Update Employee
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

export default withParams(EditEmployee);
