import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddOrder from "./components/AddOrder";
import ViewOrder from "./components/ViewOrder";
import EditOrder from "./components/EditOrder";

function Order() {
  return (
        <Routes>
          <Route path="/" element={ <ViewOrder/>} />
          <Route path="/addorder" element={ <AddOrder/>} />
          <Route path="/vieworders" element={ <ViewOrder/>} />
          <Route path="/editorder/:id" element={ <EditOrder/>} />
        </Routes>
  );
}

export default Order;
