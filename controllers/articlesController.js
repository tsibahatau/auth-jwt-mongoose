const Article = require('../models/article');

exports.postArticle = function (req, res) {

  const article = new Article({
    author: req.user._id,
    title: req.body.title,
    text: req.body.text,
    tags: req.body.tags && req.body.tags.split(','),
  });
  console.log(article);
  article.save(function (err, updatedArticle) {
    if (err) {
      res.send(err);
    } else {
      article.populate('author',function(err,populatedArticle){
         res.json({ content: populatedArticle });
      })
    }
  });
};

exports.getArticles = function (req, res) {
  Article.find()
    .populate('author')
    .exec(function (err, articles) {
    if (err) {
      res.send(err);
    } else {
      res.json({ content:articles });
    }
  });
};