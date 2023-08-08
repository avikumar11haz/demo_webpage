//jshint esversion:6

const express = require("express");

const app = express();

app.get("/", function (request, response) {
  response.send("hello");
});

app.get("/contact", function (req, res) {
  res.send("Hope you are well and good listener");
});

app.get("/hobbies", function (req, res) {
  res.send("palying cricket, and dancing");
});

app.get("/meet", function (req, res) {
  res.send("your meeting is scheduled on Thrusday");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
