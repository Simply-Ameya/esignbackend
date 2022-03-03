const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { urlencoded } = require("express");
const bodyparser = require("body-parser");

const userRoute = require("./routes/userRoutes");
//package
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.mongo_url, () => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("connection failed");
  });

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("server running on port : ", PORT);
});
