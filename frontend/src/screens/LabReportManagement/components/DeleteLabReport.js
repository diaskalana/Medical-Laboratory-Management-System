import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../utils/constants";

export default function DeleteLabReport() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pname, setPname] = useState("");
  const [phone, setPhone] = useState("");
  const [dname, setDname] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this report?"
    );
    if (confirmed) {
      setLoading(true);
      try {
        await axios.delete(`${API_BASE_URL}/labReport/delete/${id}`);
        setLoading(false);
        window.location = "/lab-reports/labreport";
      } catch (err) {
        setError(err.response.data.error);
      }
    } else {
      event.preventDefault();
      window.location = "/lab-reports/labreport";
    }
  };

  useEffect(() => {
    const showLabReport = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/labReport/get/${id}`);
        if (response.status === 200) {
          setPname(response.data.labreport.patientName);
          setPhone(response.data.labreport.patientPhone);
          setDname(response.data.labreport.doctorName);
          setEmail(response.data.labreport.doctorEmail);
          setDescription(response.data.labreport.description);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showLabReport();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    //   <form onSubmit={handleDelete} className="delete-labreport">
    <div className="" style={{ marginTop: "40px", width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Delete Lab Reports</h1>
      <form
        onSubmit={handleDelete}
        className="add-lab-report-page"
        style={{ marginTop: "50px", width: "100%" }}
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
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-danger ml-3"
          style={{ marginTop: "50px", marginLeft: "20px" }}
        >
          Delete
        </button>
      </form>
    </div>
  );
}
