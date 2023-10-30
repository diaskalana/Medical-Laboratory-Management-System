import React, { useEffect, useState } from "react";
import $ from "jquery";

const RatingStars = ({ onChange }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    $(".open-star[data-rating-value]").on("click", function () {
      const ratingValue = parseInt($(this).data("rating-value"));

      // Call the onChange callback with the selected rating
      setSelectedRating(ratingValue);
      if (onChange) {
        onChange(ratingValue);
      }

      $(".open-star[data-rating-value]").removeClass(
        "lit half-lit users-rating"
      );

      $(this).addClass("users-rating");
    });
  }, [onChange]);

  return (
    <div className="rating-stars">
      <label className="rating-label">Rate Us</label>
      <div className="rating-stars">
        <span
          data-rating-value="5"
          className={`open-star ${selectedRating >= 5 ? "users-rating" : ""}`}
        ></span>
        <span
          data-rating-value="4"
          className={`open-star ${selectedRating >= 4 ? "users-rating" : ""}`}
        ></span>
        <span
          data-rating-value="3"
          className={`open-star ${selectedRating >= 3.5 ? "half-lit" : ""} ${
            selectedRating >= 3 ? "users-rating" : ""
          }`}
        ></span>
        <span
          data-rating-value="2"
          className={`open-star ${selectedRating >= 2 ? "users-rating" : ""}`}
        ></span>
        <span
          data-rating-value="1"
          className={`open-star ${selectedRating >= 1 ? "users-rating" : ""}`}
        ></span>
      </div>
      <div className="form-error">{formErrors.rating}</div>
    </div>
  );
};

export default RatingStars;
