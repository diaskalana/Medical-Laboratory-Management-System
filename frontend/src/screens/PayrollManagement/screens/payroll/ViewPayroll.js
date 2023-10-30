import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { API_BASE_URL } from "../../../../utils/constants";

export const ViewPayroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const pageContainerStyle = {
    margin: "20px",
    padding: "20px",
  };

  const headerContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const pageTitleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const searchWrapperStyle = {
    display: "flex",
  };

  const searchInputStyle = {
    marginRight: "10px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const tableContainerStyle = {
    backgroundColor: "white",
    display: "flex",
    padding: "20px",
    boxShadow: "0px 0px 5px #888888",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tableHeaderCellStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    fontWeight: "bold",
  };

  const tableRowStyle = {
    borderBottom: "1px solid #ccc",
  };

  const tableCellStyle = {
    padding: "10px",
  };

  const actionCellStyle = {
    display: "flex",
    justifyContent: "space-around",
  };

  const buttonStyle = {
    textDecoration: "none",
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
  };

  const clearSearchButtonStyle = {
    textDecoration: "none",
    backgroundColor: "#FF5733",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const fetchPayrollData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/payroll/get`);
      if (response.data) {
        setPayrollData(response.data);
      }
    } catch (error) {
      console.error("Error retrieving payroll data:", error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this payroll data?")) {
      axios
        .delete(`${API_BASE_URL}/payroll/delete/${id}`)
        .then((response) => {
          // Refresh the payroll data after deletion
          fetchPayrollData();
        })
        .catch((error) => {
          console.error("Error deleting payroll data:", error);
        });
    }
  };

  useEffect(() => {
    fetchPayrollData();
  }, []);

  const filteredPayrollData = payrollData.filter((payroll) => {
    const {
      name,
      endingDate,
      grossPay,
      startingDate,
      paymentDate,
      totalHours,
    } = payroll;
    const query = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(query) ||
      endingDate.toLowerCase().includes(query) ||
      grossPay.toString().includes(query) ||
      startingDate.toLowerCase().includes(query) ||
      paymentDate.toLowerCase().includes(query) ||
      totalHours.toString().includes(query)
    );
  });

  const generatePDF = () => {
    const doc = new jsPDF();

    // Define the columns and rows for the PDF table
    const columns = [
      "ID",
      "Name",
      "Ending Date",
      "Gross Pay",
      "Starting Date",
      "Payment Date",
      "Total Hours",
    ];
    const rows = filteredPayrollData.map((payroll) => [
      payroll.id,
      payroll.name,
      payroll.endingDate,
      payroll.grossPay,
      payroll.startingDate,
      payroll.paymentDate,
      payroll.totalHours,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
    });

    // Save or display the PDF as needed
    doc.save("payroll.pdf"); // To save the PDF
    // doc.output('dataurlnewwindow'); // To display the PDF in a new window
  };

  return (
    <div className="page-container" style={pageContainerStyle}>
      <div className="header-container" style={headerContainerStyle}>
        <h1 className="page-title" style={pageTitleStyle}>
          Payroll List
        </h1>
        <div className="search-wrapper" style={searchWrapperStyle}>
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            style={searchInputStyle}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn-search"
            style={clearSearchButtonStyle}
            onClick={() => setSearchQuery("")}
          >
            Clear Search
          </button>
        </div>
      </div>
      <div className="table-container" style={tableContainerStyle}>
        <table className="table" style={tableStyle}>
          <thead>
            <tr className="table-row-head" style={tableRowStyle}>
              <th style={{ ...tableHeaderCellStyle, ...tableCellStyle }}>ID</th>
              <th style={{ ...tableHeaderCellStyle, ...tableCellStyle }}>
                Name
              </th>
              <th style={{ ...tableHeaderCellStyle, ...tableCellStyle }}>
                Ending Date
              </th>
              <th style={{ ...tableHeaderCellStyle, ...tableCellStyle }}>
                Gross Pay
              </th>
              <th style={{ ...tableHeaderCellStyle, ...tableCellStyle }}>
                Starting Date
              </th>
              <th style={{ ...tableHeaderCellStyle, ...tableCellStyle }}>
                Payment Date
              </th>
              <th style={{ ...tableHeaderCellStyle, ...tableCellStyle }}>
                Total Hours
              </th>
              <th style={{ ...tableHeaderCellStyle, ...tableCellStyle }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPayrollData.map((payroll) => (
              <tr className="table-row" key={payroll._id} style={tableRowStyle}>
                <td style={tableCellStyle}>{payroll.id}</td>
                <td style={tableCellStyle}>{payroll.name}</td>
                <td style={tableCellStyle}>{payroll.endingDate}</td>
                <td style={tableCellStyle}>{payroll.grossPay}</td>
                <td style={tableCellStyle}>{payroll.startingDate}</td>
                <td style={tableCellStyle}>{payroll.paymentDate}</td>
                <td style={tableCellStyle}>{payroll.totalHours}</td>
                <td style={{ ...tableCellStyle, ...actionCellStyle }}>
                  <button
                    onClick={() => handleDelete(payroll._id)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#FF5733",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      marginRight: "16px",
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`update/${payroll._id}`}>
                    <button
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        padding: "8px 16px",
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <br />
        <br />
        <center>
          <Link to="add" style={buttonStyle}>
            Go to Add Page
          </Link>
        </center>
        <br />
        <br />
        <button
          onClick={generatePDF}
          style={{
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};
