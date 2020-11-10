const bodyParser = require("body-parser");

const express = require("express");
const appChecker = require("./apps/app");

const app = express();
const port = 3000;

///working with cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/checker", appChecker);

app.use((req, res, next) => {
  res.status(200).json({
    message: "Red Code LAB",
    creator: "Oleh Mykhailovskyi"
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
