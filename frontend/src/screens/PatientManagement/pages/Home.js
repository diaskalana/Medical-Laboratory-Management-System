import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { API_BASE_URL } from "../../../utils/constants";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${API_BASE_URL}/patients`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home" style={{ display: "flex", width: "100%" }}>
      <div
        className="workouts"
        style={{ width: "100%", marginLeft: "30px", marginRight: "20px" }}
      >
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
