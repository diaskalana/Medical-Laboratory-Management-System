import React, { Component } from "react";
import axios from "axios";
import { useParams, useLocation, Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { API_BASE_URL } from "../../../utils/constants";
import { PATHS } from "../../../utils/paths";

function withParams(Component) {
  return (props) => <Component params={useParams()} />;
}

class EmployeePreview extends Component {
  constructor(props) {
    super(props);

    this.status = "";

    this.state = {
      id: props.params.id,
      employee: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get(`${API_BASE_URL}/staff/posts`).then((res) => {
      if (res.data.success) {
        this.setState({ employee: res.data.existingPosts });
        console.log(this.state.employee);
      }
    });
  }

  // edit
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
    this.status = value;
  };

  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`${API_BASE_URL}/staff/post/${id}`).then((res) => {
        alert("Delete Successfully");
        this.retrievePosts();
      });
    }
  };

  handlePrint = () => {
    const doc = new jsPDF();
    const table = document.getElementById("EmployeeTable");
    const tableRows = table.querySelectorAll("tr");

    fetch("../images/Logo1.png")
      .then((response) => response.arrayBuffer())
      .then((logoData) => {
        // const logoUrl = URL.createObjectURL(new Blob([logoData]));

        // doc.addImage(logoUrl, "PNG", 65, 10, 80, 80);
        doc.text("Staff Detail List", 15, 80);

        doc.autoTable({
          html: "#EmployeeTable",
          startY: 90,
        });

        doc.save("Employee_Detail_Table.pdf");
      })
      .catch((error) => {
        console.error("Error loading logo image:", error);
      });
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="" style={{ maxWidth: "max-content" }}>
          <div className="add_btn mt-2 mb-2">
            <a href={`${PATHS.staff}/EmployeeList`}>
              <button className="backBtn">Employee List</button>
            </a>
            <button onClick={this.handlePrint} className="backBtn">
              Save
            </button>
          </div>
          <br />
          <h3>Employee Detail List</h3>
          <div className="table-responsive">
            <table className="table" id="EmployeeTable">
              <thead>
                <tr className="table-dark">
                  <th scope="col">No.</th>
                  <th scope="col">NIC</th>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Type</th>
                  <th scope="col">Salary</th>
                </tr>
              </thead>
              <tbody>
                {this.state.employee.map((employee, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td> {employee.NIC}</td>
                    <td>{employee.name}</td>
                    <td>{employee.address}</td>
                    <td>{employee.dateOfBirth.substring(0, 10)}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.contactNo}</td>
                    <td>{employee.type}</td>
                    <td>{employee.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(EmployeePreview);
