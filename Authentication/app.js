//jshint esversion:6

const express = require('express');
const ejs = require('ejs');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Sever running on port 3000');
});
