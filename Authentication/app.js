//jshint esversion:6
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(encrypt, {
  secret: process.env.SECRET,
  encryptedFields: ['password'],
});

const User = new mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const user = new User({
    email: req.body.username,
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.render('secrets');
    }
  });

  // User.find({ email: req.body.username }, (err, results) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   if (results) {
  //     res.send('User with this email already exists');
  //   } else {
  //     user.save((err) => {
  //       if (err) {
  //         res.send(err);
  //       }
  //     });
  //   }
  // });
});

app.post('/login', (req, res) => {
  User.findOne({ email: req.body.username }, (err, results) => {
    if (err) {
      res.send(err);
    }
    if (results) {
      if (results.password === req.body.password) {
        res.render('secrets');
      } else {
        res.send('Invalid password');
      }
    } else {
      res.send('User with this email does not exists');
    }
  });
});

app.listen(3000, () => {
  console.log('Sever running on port 3000');
});
