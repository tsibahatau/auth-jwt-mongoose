const mongoose = require('mongoose');


const ArticleSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    default: 'Stub title',
  },
  text: {
    type: String,
    default: 'Stub text',
  },
  tags: {
    type: [],
  },
  comments: [{
    text: {
      type: String,
      default: 'Stub comment text',
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
ArticleSchema.methods = {
  addComment: function (user, comment) {
    this.comments.push({
      text: comment,
      user: user._id,
    });
    return this.save();
  },
};

// Export the Mongoose model
module.exports = mongoose.model('Article', ArticleSchema);