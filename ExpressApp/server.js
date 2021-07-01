// jshint esversion:6

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact at abc!!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About!!</h1>");
});
app.listen(3000, () => console.log("Server is running"));
