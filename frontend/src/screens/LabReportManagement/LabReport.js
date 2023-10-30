import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddLabReport from "./components/AddLabReport";
import DeleteLabReport from "./components/DeleteLabReport";
import UpdatedLabReport from "./components/UpdateLabReport";

function LabReport() {
  return (
    // <div>
    //   <BrowserRouter>
    //     <div className="main">
    //       <div className="row">
    //         <NavBar />
            <Routes>
              <Route path="/" element={<AddLabReport />} />
              <Route path="/labreport" element={<AddLabReport />} />
              <Route path="/delete/:id" element={<DeleteLabReport />} />
              <Route path="/update/:id" element={<UpdatedLabReport />} />
            </Routes>
    //       </div>
    //     </div>
    //   </BrowserRouter>
    // </div>
  );
}

export default LabReport;
