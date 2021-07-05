// jshint esversion: 6

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
  name: 'Apple',
  rating: 8,
  review: 'Very good',
});

//fruit.save();

Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    console.log(fruits);
  }
});
