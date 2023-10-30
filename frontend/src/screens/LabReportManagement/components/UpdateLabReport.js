import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../utils/constants";

export default function UpdatedLabReport() {
  const { id } = useParams();
  const [pname, setPname] = useState("");
  const [phone, setPhone] = useState("");
  const [dname, setDname] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchLabReport() {
      try {
        const response = await axios.get(`${API_BASE_URL}/labReport/get/${id}`);
        setPname(response.data.labreport.patientName);
        setPhone(response.data.labreport.patientPhone);
        setDname(response.data.labreport.doctorName);
        setEmail(response.data.labreport.doctorEmail);
        setDescription(response.data.labreport.description);
      } catch (err) {
        console.log(err);
      }
    }
    fetchLabReport();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const labreport = {
      pname,
      phone,
      dname,
      email,
      description,
    };

    console.log(labreport);

    try {
      await axios.put(`${API_BASE_URL}/labReport/update/${id}`, labreport);

      alert("Lab report updated successfully!");
      window.location = "/lab-reports/labreport";
    } catch (err) {
      console.log(err);
    }
  };

  if (!id) {
    return <div>No Lab Report found.</div>;
  }

  return (
    <div className="" style={{ marginTop: "40px", width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Update Lab Reports</h1>
      <form
        onSubmit={handleSubmit}
        className="update labreport"
        style={{ marginTop: "50px" }}
      >
        <div style={{ display: "flex" }}>
          <div className="form-row" style={{ width: "50%", margin: "0 20px" }}>
            <div className="form-group">
              <label htmlFor="pname">Patient Name</label>
              <input
                type="text"
                className="form-control"
                id="pname"
                placeholder="Enter Patient Name"
                value={pname}
                onChange={(event) => setPname(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Patient Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </div>
          <div className="form-row" style={{ width: "50%", margin: "0 20px" }}>
            <div className="form-group">
              <label htmlFor="dname">Doctor Name</label>
              <input
                type="text"
                className="form-control"
                id="dname"
                placeholder="Enter Doctor Name"
                value={dname}
                onChange={(event) => setDname(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Doctor Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-row" style={{ margin: "0 20px" }}>
          <div className="form-group col-md-12">
            <label htmlFor="description">Description</label>
            {/* <input 
                            type="text" 
                            className="form-control" 
                            id="url" 
                            placeholder="Enter Report URL"
                            value={reporturl}
                            onChange={(e) => setReportURL(e.target.value)}
                        /> */}
            <textarea
              className="form-control"
              id="description"
              placeholder="Enter a description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-danger ml-3"
          style={{ marginTop: "50px", marginLeft: "20px" }}
        >
          Update
        </button>
      </form>
    </div>
  );
}
