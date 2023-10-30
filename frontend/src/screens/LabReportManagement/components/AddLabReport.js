import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/LabReport.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icons
//import { useReactToPrint } from "react-to-print"; // Import the useReactToPrint hook
import jsPDF from "jspdf"; // Import jsPDF
import "jspdf-autotable"; // Import jspdf-autotable
import { API_BASE_URL } from "../../../utils/constants";

export default function AddLabReport() {
  const [faFileDownload] = useState([]);
  const [pname, setPname] = useState("");
  const [phone, setPhone] = useState("");
  const [dname, setDname] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [labreport, setLabReport] = useState([]);
  const [column, setColumns] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!pname.trim()) {
      errors.pname = "Patient name is required";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhone(phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!dname.trim()) {
      errors.dname = "Doctor name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!description.trim()) {
      errors.description = "Description is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPhone = (phone) => {
    const phonePattern = /^\d{10}$/;
    if (phone.length < 10 || phone.length > 10) {
      return phonePattern.test(phone);
    }
    return phonePattern.test(phone);
  };

  useEffect(() => {
    function getLabReports() {
      axios
        .get(`${API_BASE_URL}/labReport`)
        .then((res) => {
          if (res.data[0]) {
            setColumns(Object.keys(res.data[0]));
            setLabReport(res.data);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getLabReports();
  }, []);

  function sendData(e) {
    e.preventDefault();

    //alert("Submit");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const newLabReport = {
      pname,
      phone,
      dname,
      email,
      description,
    };

    console.log(newLabReport);

    axios
      .post(`${API_BASE_URL}/labReport/add`, newLabReport)
      .then(() => {
        alert("Lab Report Added");
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const handleAdd = () => {
    const addReport = document.getElementById("addReport");
    const viewReport = document.getElementById("viewReport");

    addReport.classList.remove("d-none");
    viewReport.classList.add("d-none");
  };
  const handleView = () => {
    const addReport = document.getElementById("addReport");
    const viewReport = document.getElementById("viewReport");

    addReport.classList.add("d-none");
    viewReport.classList.remove("d-none");
  };

  const filteredLabReport = labreport.filter((labreport) =>
    labreport.patientName.toLowerCase().includes(searchValue.toLowerCase())
  );

  function generateReport() {
    const doc = new jsPDF();

    const columnStyles = {
      0: { columnWidth: 30 },
      1: { columnWidth: 30 },
      2: { columnWidth: 30 },
      3: { columnWidth: 30 },
      4: { columnWidth: 30 },
      5: { columnWidth: 30 },
    };

    doc.autoTable({
      head: [column],
      body: filteredLabReport.map((labreport) => Object.values(labreport)),
      columnStyles: columnStyles,
    });
    doc.save("lab_report.pdf");
  }

  if (filteredLabReport.length === 0) {
    return <p>No lab report found</p>;
  }

  return (
    <>
      <div
        className="col-12"
        style={{
          marginTop: "0px",
          height: "800px",
          backgroundImage: `url(${process.env.PUBLIC_URL}/pxfuel.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <h1
          style={{ textAlign: "center", color: "#FFFFFF", marginLeft: "50px" }}
        >
          Lab Reports Details
        </h1>
        <div>
          <a
            onClick={handleAdd}
            class="btn btn-lg"
            disabled
            role="button"
            aria-pressed="true"
            style={{
              marginTop: "30px",
              marginLeft: "200px",
              background: "#5AB7A6",
            }}
          >
            Add Lab Report
          </a>
          <a
            onClick={handleView}
            class="btn btn-lg"
            disabled
            role="button"
            aria-pressed="true"
            style={{
              marginTop: "30px",
              marginLeft: "20px",
              background: "#5AB7A6",
            }}
          >
            View Lab Report
          </a>
        </div>

        <div id="addReport" className="">
          <form onSubmit={sendData} className="add-lab-report-page">
            <div style={{ display: "flex", width: "100%" }}>
              <div
                className="form-row"
                style={{ width: "50%", margin: "0 20px" }}
              >
                <div className="form-group">
                  <label htmlFor="pname">Patient Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.pname ? "is-invalid" : ""
                    }`}
                    id="pname"
                    placeholder="Enter Patient Name"
                    value={pname}
                    onChange={(e) => setPname(e.target.value)}
                  />
                  {errors.pname && (
                    <div className="invalid-feedback">{errors.pname}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Patient Phone Number</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    id="phone"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>
              </div>
              <div
                className="form-row"
                style={{ width: "50%", margin: "0 20px" }}
              >
                <div className="form-group">
                  <label htmlFor="dname">Doctor Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.dname ? "is-invalid" : ""
                    }`}
                    id="dname"
                    placeholder="Enter Doctor Name"
                    value={dname}
                    onChange={(e) => setDname(e.target.value)}
                  />
                  {errors.dname && (
                    <div className="invalid-feedback">{errors.dname}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Doctor Email</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="form-row" style={{ margin: "0 20px" }}>
              <div className="form-group col-md-12">
                <label htmlFor="description">Description</label>
                <textarea
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  id="description"
                  placeholder="Enter a description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn ml-3"
              style={{
                marginTop: "50px",
                marginLeft: "20px",
                background: "#5AB7A6",
                width: "100px",
              }}
            >
              Save
            </button>
          </form>
        </div>

        <div id="viewReport" className="col-12 d-none">
          <div style={{ width: "1100px", marginLeft: "200px" }}>
            <form className="d-flex justify-content-end" role="search">
              <input
                className="form-control me-2"
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                aria-label="Search"
                style={{ marginLeft: "200px", width: "300px" }}
              />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ background: "#5AB7A6" }}
              >
                Search
              </button>
            </form>
          </div>
          <table
            className="table table-hover"
            style={{ margin: "65px", width: "1100px", marginLeft: "200px" }}
          >
            <thead>
              <tr>
                <th scope="col-2">Patient Name</th>
                <th scope="col-2">Patient Phone</th>
                <th scope="col-2">Doctor Name</th>
                <th scope="col-3">Doctor Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLabReport.map((labreport, index) => (
                <tr key={index}>
                  <td>{labreport.patientName}</td>
                  <td>{labreport.patientPhone}</td>
                  <td>{labreport.doctorName}</td>
                  <td>{labreport.doctorEmail}</td>
                  <td>
                    <Link
                      to={`/lab-reports/update/${labreport._id}`}
                      className="btn btn-danger"
                    >
                      Update
                    </Link>
                    <Link
                      to={`/lab-reports/delete/${labreport._id}`}
                      className="btn btn-danger ms-3 "
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="app-generate"
            onClick={generateReport}
            style={{ marginLeft: "200px", background: "#545f71" }}
          >
            Download Report
            <FontAwesomeIcon
              icon={faFileDownload}
              className="app-report-icon"
            />
          </button>
        </div>
      </div>
    </>
  );
}
