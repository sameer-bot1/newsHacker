const mongoose = require('mongoose');

const newsModel = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
      hackerNewsUrl: {
        type: String,
        // required: true,
        unique: true,
      },
      postedOn: {
        type: String,
        required: true,
      },
      upvotes: {
        type: String,
        default: 0,
      },
      comments: {
        type: Number,
        default: 0,
      },
      user:{
        type: String,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      }
});

module.exports = mongoose.model('newsItem', newsModel)

