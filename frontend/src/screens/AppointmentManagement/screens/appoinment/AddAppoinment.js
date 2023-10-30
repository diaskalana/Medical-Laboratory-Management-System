import React, { useState, useEffect } from "react";
import "../../styles/add-appoinment-style.css";
import { Alert } from "../../components/Alert/Alert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../../utils/constants";

const initialState = {
  name: "",
  mail: "",
  mobile: "",
  doctor: "",
  payment: "",
  date: "",
  time: "",
};
export const AddAppoinment = () => {
  const [openAlert, setOpenAleart] = useState(false);
  const [aleartType, setaleartType] = useState(true);
  const [aleartMessage, setAleartMessage] = useState("");
  const navigator = useNavigate();
  const [id, setId] = useState(useParams());
  const [formData, setFormData] = useState(initialState);
  const [error, SetError] = useState({
    name: "",
    mail: "",
    mobile: "",
    doctor: "",
    payment: "",
    date: "",
    time: "",
  });

  const handleSubmit = () => {
    console.log("Form data:", formData);

    axios
      .post(`${API_BASE_URL}/appointment/add`, formData)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        setaleartType(true);
        setAleartMessage("Data Added success. ");
        setOpenAleart(true);
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setaleartType(false);
        setAleartMessage("Data Added failed. ");
        setOpenAleart(true);
      });
  };

  /*
   * input onChange method
   * @param {e} e
   */
  const onchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    //validating user inputs
    switch (name) {
      case "name":
        error.name =
          value.length <= 0 ? "Name can not be empty! Ex:- Jhon doe " : "";
        formData.name = value;
        break;
      case "mail":
        error.mail =
          value.length <= 0
            ? "Mail can not be empty! Ex:- jhondoe@mail.com "
            : "";
        formData.mail = value;
        break;
      case "doctor":
        error.doctor =
          value.length <= 0
            ? "Doctor name can not be empty! Ex:- Doc. Jhon doe "
            : "";
        formData.doctor = value;
        break;
      case "mobile":
        error.mobile =
          value.length <= 0
            ? "Mobile number can not be empty! Ex:- 0111 000 000 "
            : "";
        formData.mobile = value;
        break;
      case "payment":
        error.payment =
          value.length <= 0
            ? "Payment mmethod can not be empty! Select an option "
            : "";
        formData.payment = value;
        break;
      case "date":
        error.date =
          value.length <= 0 ? "Date can not be empty! Ex:- 2023-09-27" : "";
        formData.date = value;
        break;
      case "time":
        error.time =
          value.length <= 0 ? "Time can not be empty! Ex:- 11:50 p.m" : "";
        formData.time = value;
        break;

      default:
        break;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name + " " + e.target.value);
  };

  return (
    <>
      {openAlert ? (
        <Alert
          message={aleartMessage}
          type={aleartType}
          open={openAlert}
          setOpen={setOpenAleart}
        />
      ) : (
        <div className="body-container">
          <h2>Book an Appoinment</h2>
          <div className="page-image"></div>
          <div className="form-container" style={{ flexDirection: "row" }}>
            <div className="form-left">
              <div className="form-input" style={{ border: "0px" }}>
                <label htmlFor="name">Name</label>
                <input
                  className="input"
                  type="text"
                  value={formData?.name}
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  onChange={onchange}
                />
                <div className="error-text">{error.name ? error.name : ""}</div>
              </div>
              <div className="form-input" style={{ border: "0px" }}>
                <label htmlFor="mail">E-mail</label>
                <input
                  className="input"
                  type="email"
                  value={formData?.mail}
                  id="mail"
                  name="mail"
                  placeholder="Enter your e-mail"
                  onChange={onchange}
                />
                <div className="error-text">{error.name ? error.mail : ""}</div>
              </div>
              <div className="form-input" style={{ border: "0px" }}>
                <label htmlFor="mobile">Phone Number</label>
                <input
                  className="input"
                  type="text"
                  id="mobile"
                  value={formData?.mobile}
                  name="mobile"
                  placeholder="Enter your phone number"
                  onChange={onchange}
                />
                <div className="error-text">
                  {error.name ? error.mobile : ""}
                </div>
              </div>
              <div className="form-input" style={{ border: "0px" }}>
                <label htmlFor="doctor">Doctor</label>
                <input
                  className="input"
                  type="text"
                  id="doctor"
                  name="doctor"
                  value={formData?.doctor}
                  placeholder="Enter doctor's name"
                  onChange={onchange}
                />
                <div className="error-text">
                  {error.doctor ? error.doctor : ""}
                </div>
              </div>
            </div>
            <div className="form-right">
              <div className="form-input" style={{ border: "0px" }}>
                <label htmlFor="date">Date</label>
                <input
                  className="input-date"
                  type="date"
                  id="date"
                  name="date"
                  value={formData?.date}
                  placeholder="Enter date"
                  onChange={onchange}
                />
                <div className="error-text">{error.date ? error.date : ""}</div>
              </div>
              <div className="form-input" style={{ border: "0px" }}>
                <label htmlFor="time">Time</label>
                <input
                  className="input-date"
                  type="time"
                  id="time"
                  name="time"
                  value={formData?.time}
                  placeholder="Enter time"
                  onChange={onchange}
                />
                <div className="error-text">{error.time ? error.time : ""}</div>
              </div>
              <div className="form-input" style={{ border: "0px" }}>
                <label htmlFor="payment">Payment Method</label>
                <select
                  className="input"
                  name="payment"
                  id="payment"
                  onChange={onchange}
                  defaultValue={formData?.payment}
                >
                  <option value="card">Card</option>
                  <option value="cash">Cash</option>
                </select>
                <div className="error-text">
                  {error.payment ? error.payment : ""}
                </div>
              </div>
              <div className="button-row">
                <button
                  className="btn-submit"
                  onClick={() => {
                    handleSubmit();
                    setOpenAleart(!openAlert);
                  }}
                >
                  Submit
                </button>
                <button
                  className="btn-cancle"
                  onClick={() => {
                    navigator("/appointment");
                  }}
                >
                  Cancle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
