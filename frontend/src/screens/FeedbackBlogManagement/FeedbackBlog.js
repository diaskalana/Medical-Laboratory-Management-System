import FeedbackFunction from "./Components/feedback";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewAllFeedbacks from "./Components/ViewAlllFeedbacks";
import EditFeedback from "./Components/EditFeedback";
import Blogs from "./Components/Blogs";
import AddBlog from "./Components/AddBlog";
import AddBlog2 from "./Components/AddBlog2";
import EditBlog from "./Components/EditBlog";
function FeedbackBlog() {
  return (
    <div>
        <Routes>
          <Route path="/" element={ <FeedbackFunction />} />
          <Route path="/viewallfeedbacks" element={ <ViewAllFeedbacks />} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/addblog" element={<AddBlog/>} />
          <Route path="/addblogg" element={<AddBlog2/>} />
          <Route path="/editblog/:id" element={<EditBlog/>} />
          <Route path="/editfeedback/:id" element={ <EditFeedback />} />
        </Routes>
    </div>
  );
}

export default FeedbackBlog;
