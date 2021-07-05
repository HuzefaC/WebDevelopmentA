//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsSchema = {
  name: {
    type: String,
    required: true,
  },
};

const Item = mongoose.model("Item", itemsSchema);

app.get("/", function (req, res) {
  const day = date.getDate();
  Item.find((err, results) => {
    if (err) {
    } else {
      res.render("list", { listTitle: day, newListItems: results });
    }
  });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  const itemDB = new Item({
    name: item,
  });
  itemDB.save((err) => {
    if (err) {
    }
    res.redirect("/");
  });
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  Item.deleteOne({ _id: checkedItemId }, (err) => {
    if (err) {
    } else {
      res.redirect("/");
    }
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
