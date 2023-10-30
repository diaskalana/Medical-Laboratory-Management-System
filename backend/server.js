const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// mongodb connection
const con = require("./db/connection.js");
app.use("/api/finance", require("./routes/financeRoute.js"));
app.use("/api/patients", require("./routes/workouts.js"));
app.use("/api/payroll", require("./routes/payroll-route.js"));
app.use("/api/appointment", require("./routes/appoinment-route.js"));
app.use("/api/staff", require("./routes/staffRoute.js"));
app.use("/api/labReport", require("./routes/labReportRoute.js"));


const orderRouter = require("./routes/order.js");
app.use("/order", orderRouter);

const feedbackRouter = require("./routes/feedback.js");
app.use("/feedback", feedbackRouter);
const bloggRouter = require("./routes/blogg.js");
app.use("/blogg", bloggRouter);


con
  .then((db) => {
    if (!db) return process.exit(1);

    // listen to the http server
    const server = app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed To Connect with HTTP Server : ${err}`)
    );
    // error in mondb connection
  })
  .catch((error) => {
    console.log(`Connection Failed...! ${error}`);
  });
