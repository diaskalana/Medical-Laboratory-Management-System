import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";

export default function EditFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  const onChange = (ratingValue) => {
    setSelectedRating(ratingValue);
    console.log(`Selected rating: ${ratingValue}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8082/feedback/get/${id}`)
      .then((response) => {
        const feedbackData = response.data;
        setName(feedbackData.userName);
        setEmail(feedbackData.email);
        setDate(feedbackData.date);
        setMessage(feedbackData.message);
        setSelectedRating(feedbackData.rate);
      })
      .catch((error) => {
        console.error("Error fetching feedback data:", error);
      });
  }, [id]);

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!date) {
      errors.date = "Date is required";
    }

    if (!message.trim()) {
      errors.message = "Message is required";
    }

    if (selectedRating === 0) {
      errors.rating = "Please rate us";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendData = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedFeedback = {
      userName: name,
      email,
      date,
      message: message,
      rate: selectedRating,
    };

    axios
      .put(`http://localhost:8082/feedback/update/${id}`, updatedFeedback)
      .then(() => {
        alert("Feedback Updated");
        navigate("/viewallfeedbacks");
      })
      .catch((error) => {
        console.error("Error updating feedback:", error);
        alert("An error occurred while updating feedback.");
      });
  };

  return (
    <div>
      <div className="session">
        <div className="left"></div>
        <form onSubmit={sendData} className="feedback pharse" autoComplete="off">
          <h4>Edit Feedback</h4>
          <p>We encourage you to share your thoughts and suggestions with us; your feedback is a vital driver of our growth.</p>
          <div className="floating-label">
            <input
              placeholder={formErrors.name || "User Name"}
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  name: "",
                }));
              }}
            />
          </div>
          <div className="floating-label">
            <input
              placeholder={formErrors.email || "Email"}
              type="text"
              name="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  email: "",
                }));
              }}
            />
          </div>
          <div className="floating-label">
            <input
              placeholder={formErrors.date ? formErrors.date : "Date"}
              type="date"
              name="date"
              id="date"
              autoComplete="off"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  date: "",
                }));
              }}
            />
          </div>
          <div className="message-box">
            <input
              placeholder={formErrors.message || "Message"}
              type="text"
              name="message"
              id="message"
              autoComplete="off"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  message: "",
                }));
              }}
            />
          </div>
          <label className="rating-label">Rate Us</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                data-rating-value={value}
                className={`open-star ${
                  selectedRating >= value ? "users-rating" : ""
                }`}
                onClick={() => onChange(value)}
              ></span>
            ))}
          </div>
          <div className="form-error">{formErrors.rating}</div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
