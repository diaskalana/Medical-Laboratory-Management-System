import "./side-nav-style.css";
import logo from "./components/logo.png";

export const SideNavbar = () => {
  return (
    <div className="nav-container">
      <img src={logo} alt="Avatar" className="app-logo" />
      <div className="nav-content">
        <div className="nav-item">
          <a href="/">Dashboard</a>
        </div>
        <div className="nav-item">
          <a href="/add">Blog & Feedback</a>
        </div>

        <div className="nav-item">
          <a href="/add">Patients</a>
        </div>

        <div className="nav-item">
          <a href="/add">Staff members</a>
        </div>

        <div className="nav-item">
          <a href="/add">Inventory</a>
        </div>

        <div className="nav-item">
          <a href="/add">Lab Reports</a>
        </div>

        <div className="nav-item">
          <a href="/add">Attendence & Payroll</a>
        </div>

        <div className="nav-item">
          <a href="/add">Finance</a>
        </div>

        <hr className="nav-hr" />

        <div className="nav-item logout">
          <a href="/add">Log out</a>
        </div>
      </div>
    </div>
  );
};
