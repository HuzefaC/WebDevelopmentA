// jshint esversion:6

const express = require('express');
const https = require('https');
const app = express();
app.use(express.urlencoded({ extended: true }));

const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
let city = 'Belgaum';
const apiKey = 'b39b320a3863c58eb644261c41c9e299';
const unit = 'metric';
let url = `${endpoint}?q=${city}&appid=${apiKey}&units=${unit}`;
const img = 'https://openweathermap.org/img/wn/';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  city = req.body.city;
  url = `${endpoint}?q=${city}&appid=${apiKey}&units=${unit}`;
  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on('data', (data) => {
        const weatherData = JSON.parse(data);
        const weatherDescription = weatherData.weather[0].description;
        const icon = img + weatherData.weather[0].icon + '@2x.png';
        const temperature = weatherData.main.temp;
        res.send(
          `<h1>The weather in ${city} is ${weatherDescription}.</h1>
        <h1>The temperature in ${city} is ${temperature} degree celcius</h1>
        <img src=${icon}>`
        );
      });
    } else {
      res.send(`Error ${res.statusCode}: ${res.status}`);
    }
  });
});

app.listen(3000, () => console.log('app running'));
