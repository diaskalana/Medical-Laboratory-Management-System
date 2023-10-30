import React, { useState, useEffect } from "react";
import "../App.css";
import $ from "jquery";
import axios from "axios";
import { Link } from 'react-router-dom';


function FeedbackFunction() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [formErrors, setFormErrors] = useState({});

  // Define an onChange callback function
  const onChange = (ratingValue) => {
    // Handle the rating change here
    console.log(`Selected rating: ${ratingValue}`);
  };

  useEffect(() => {
    $(".open-star[data-rating-value]").on("click", function () {
      const ratingValue = parseInt($(this).data("rating-value"));

      // Call the onChange callback with the selected rating
      setSelectedRating(ratingValue);
      if (onChange) {
        onChange(ratingValue);
      }
    });
  }, [onChange]);

  function validateForm() {
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
  }

  function sendData(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newFeedback = {
      uId: 1,
      userName: name,
      email,
      date,
      message: message,
      rate: selectedRating,
    };

    console.log(newFeedback);

    axios
      .post("http://localhost:8082/feedback/add", newFeedback)
      .then(() => {
        alert("Feedback Added");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while sending feedback.");
      });
  }

  return (
    <div>
      <Link to="/feedback/viewallfeedbacks"><button className="btn btn-primary my-4">View All Feedbacks</button></Link>
      <Link to="/feedback/blogs"><button className="btn btn-primary mx-2 my-4">Blogs</button></Link>
      <div className="session  ml-5" style={{}}>
        <div className="left"></div>
        <form
          onSubmit={sendData}
          className="feedback pharse"
          autoComplete="off"
        >
          <h4>
            We are <span>SUWA SAHANA</span>
          </h4>
          <p>
            We encourage you to share your thoughts and suggestions with us;
            your feedback is a vital driver of our growth.
          </p>
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
                // Clear the error message when typing
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
                // Clear the error message when typing
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
                // Clear the error message when selecting a date
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
                // Clear the error message when typing
                setFormErrors((prevErrors) => ({
                  ...prevErrors,
                  message: "",
                }));
              }}
            />
          </div>
          <label className="rating-label">Rate Us</label>
          <div className="rating-stars">
            <span
              data-rating-value="5"
              className={`open-star ${selectedRating >= 5 ? "users-rating" : ""
                }`}
            ></span>
            <span
              data-rating-value="4"
              className={`open-star ${selectedRating >= 4 ? "users-rating" : ""
                }`}
            ></span>
            <span
              data-rating-value="3"
              className={`open-star ${selectedRating >= 3.5 ? "half-lit" : ""
                } ${selectedRating >= 3 ? "users-rating" : ""}`}
            ></span>
            <span
              data-rating-value="2"
              className={`open-star ${selectedRating >= 2 ? "users-rating" : ""
                }`}
            ></span>
            <span
              data-rating-value="1"
              className={`open-star ${selectedRating >= 1 ? "users-rating" : ""
                }`}
            ></span>
          </div>
          <div className="form-error">{formErrors.rating}</div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackFunction;
