import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useState } from "react"; // Import useState to manage form input
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { API_BASE_URL } from "../../../utils/constants";
import "../styles/WorkoutDetails.css";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [isEditing, setIsEditing] = useState(false); // State to control editing mode
  const [editedWorkout, setEditedWorkout] = useState({}); // State to store edited workout data

  const handleUpdateClick = () => {
    setIsEditing(true);
    setEditedWorkout({
      title: workout.title,
      load: workout.load,
      reps: workout.reps,
    });
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`${API_BASE_URL}/patients/` + workout._id, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
      window.location.reload();
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    // Send a PUT or PATCH request to update the workout
    const response = await fetch(`${API_BASE_URL}/patients/` + workout._id, {
      method: "PUT", // Use PUT or PATCH based on your API design
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedWorkout),
    });

    if (response.ok) {
      const updatedWorkout = await response.json();
      dispatch({ type: "UPDATE_WORKOUT", payload: updatedWorkout });
      setIsEditing(false);

      window.location.reload();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedWorkout({
      ...editedWorkout,
      [name]: value,
    });
  };

  return (
    <div className="workout-details">
      <h4>
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editedWorkout.title}
            onChange={handleInputChange}
          />
        ) : (
          workout.title
        )}
      </h4>
      <p>
        <strong>Date: </strong>
        {isEditing ? (
          <input
            type="number"
            name="load"
            value={editedWorkout.load}
            onChange={handleInputChange}
          />
        ) : (
          workout.load
        )}
      </p>
      <p>
        <strong>Number </strong>
        {isEditing ? (
          <input
            type="number"
            name="reps"
            value={editedWorkout.reps}
            onChange={handleInputChange}
          />
        ) : (
          workout.reps
        )}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      {isEditing ? (
        <>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          <button
            className="material-symbols-outlined"
            onClick={handleUpdateClick}
          >
            Edit
          </button>
          <button
            className="material-symbols-outlined"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default WorkoutDetails;
