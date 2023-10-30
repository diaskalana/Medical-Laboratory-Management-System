import "../../styles/side-nav-style.css";
import logo from "../../assets/logo.png";

import { PATHS } from "../../utils/paths";

export const SideNavbar = () => {
  return (
    <div className="nav-container no-print" style={{ marginRight: "0px" }}>
      <img src={logo} alt="Avatar" className="app-logo" />
      <div className="nav-content">
        <div className="nav-item">
          <a href={PATHS.appointment}>Appointment</a>
        </div>
        <div className="nav-item">
          <a href={PATHS.feedback}>Blog & Feedback</a>
        </div>

        <div className="nav-item">
          <a href={PATHS.patients}>Patients</a>
        </div>

        <div className="nav-item">
          <a href={PATHS.staff}>Staff members</a>
        </div>

        <div className="nav-item">
          <a href={PATHS.inventory}>Inventory</a>
        </div>

        <div className="nav-item">
          <a href={PATHS.labReports}>Lab Reports</a>
        </div>

        <div className="nav-item">
          <a href={PATHS.payroll}>Payroll</a>
        </div>

        <div className="nav-item">
          <a href={PATHS.finance}>Finance</a>
        </div>

        <hr className="nav-hr" />

        {/* <div className="nav-item logout">
          <a href="/add">Log out</a>
        </div> */}
      </div>
    </div>
  );
};
