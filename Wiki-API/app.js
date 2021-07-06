// jshint esversion: 6

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model('Article', articleSchema);

app.get('/articles', (req, res) => {
  Article.find((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

app.post('/articles', (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  article.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully added new article.');
    }
  });
});

app.delete('/articles', (req, res) => {
  Article.deleteMany((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send('Successfully deleted all articles.');
    }
  });
});

app.listen(3000, () => {
  console.log('Sever running on port 3000');
});
