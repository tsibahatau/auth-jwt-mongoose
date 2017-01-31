const Article = require('../models/article');

exports.addComment = function (req, res) {
  Article.findById(req.params.uid, function (err, article) {
    if (err) {
      res.send(err);
    }
    if (article) {
      article.addComment(req.user, req.body.text);
      res.json({ message: 'Comment was succesfully adede' });
    } else {
      res.status(404).json({ message: 'No such article!' });
    }
  });
};