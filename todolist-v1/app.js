// jshint esversion: 6

const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const toDO = [];

app.get("/", (req, res) => {
  let day = date.getDay();
  res.render("list", { dayOfTheWeek: day, items: toDO });
});

app.post("/", (req, res) => {
  let nextToDo = req.body.todo;
  toDO.push(nextToDo);
  res.redirect("/");
});

app.listen(3000, () => console.log("Server is running"));
