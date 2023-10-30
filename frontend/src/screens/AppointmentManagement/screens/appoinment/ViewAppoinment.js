import "../../styles/view-appoinment-style.css";
import deleteIcon from "../../assets/icons8-delete-document-48.png";
import editIcon from "../../assets/icons8-edit-property-48.png";
import "../../styles/warning-style.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../utils/constants";

export const ViewAppoinment = () => {
  const [appointments, setAppointments] = useState([]);
  const [tempAppoinment, setTempAppoinment] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get(`${ API_BASE_URL }/appointment/get`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [appointments]);
  const showDeleteAppoinment = (row) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTempAppoinment(row);
    setShowDeleteDialog(true);
  };
  const deleteAppoinment = () => {
    axios
      .delete(`${ API_BASE_URL }/appointment/delete/${tempAppoinment._id}`)
      .then((response) => {
        setAppointments(
          appointments.filter(
            (appointment) => appointment._id !== tempAppoinment._id
          )
        );
        setShowDeleteDialog(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const gotoEditAppoinment = (row) => {
    navigator(`/appointment/update/${row._id}`);
  };
  return (
    <div className="">
      {showDeleteDialog && (
        <div className="warning">
          <div className="warning-header">Delete appoinment</div>
          <div className="warning-body">
            Do you want delete {tempAppoinment.name}'s appoinment?
          </div>
          <div className="waning-footer">
            <button
              className="warning-btn ok-btn"
              onClick={() => deleteAppoinment()}
            >
              Delete
            </button>
            <button
              className="warning-btn cancle"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancle
            </button>
          </div>
        </div>
      )}
      <div className="page-container">
        <div className="header-container">
          <h1 className="page-title">Appoinments List</h1>
          <div className="search-wrapper">
            <input
              className="search-input"
              type="search"
              placeholder="Search"
            />
            <button className="btn-search">Search</button>
          </div>
        </div>
        <div className="table-container">
          <table className="table">
            <tr className="table-row-head">
              <th>E-mail</th>
              <th>Phone Number</th>
              <th>Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment Method</th>
              <th>Options</th>
            </tr>
            {appointments.map((appointment) => (
              <tr className="table-row">
                <td>{appointment.mail}</td>
                <td>{appointment.mobile}</td>
                <td>{appointment.name}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.payment}</td>
                <td>
                  <div className="table-option">
                    <button
                      className="edit-btn"
                      onClick={() => gotoEditAppoinment(appointment)}
                    >
                      <img src={editIcon} width="30px" />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => showDeleteAppoinment(appointment)}
                    >
                      <img src={deleteIcon} width="30px" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <button
          className="btn-download"
          onClick={() => navigator("/appointment/add")}
        >
          + Add new
        </button>
      </div>
    </div>
  );
};
