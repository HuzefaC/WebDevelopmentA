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

app
  .route('/articles')
  .get((req, res) => {
    Article.find((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  })
  .post((req, res) => {
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
  })
  .delete((req, res) => {
    Article.deleteMany((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Successfully deleted all articles.');
      }
    });
  });

app
  .route('/articles/:title')
  .get((req, res) => {
    Article.find({ title: req.params.title }, (err, article) => {
      if (err) {
        res.send(err);
      }
      if (article) {
        res.send(article);
      } else {
        res.send('No article was found');
      }
    });
  })
  .put((req, res) => {
    Article.updateOne(
      { title: req.params.title },
      {
        title: req.body.title,
        content: req.body.content,
      },
      { overwrite: true },
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Successfully updated');
        }
      }
    );
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.title },
      { $set: req.body },
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Successfully updated');
        }
      }
    );
  })
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.title }, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Successfully deleted the article.');
      }
    });
  });

app.listen(3000, () => {
  console.log('Sever running on port 3000');
});
