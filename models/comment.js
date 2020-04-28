var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user: {
    type: String,
    required: true,
  },

  comment: {
    type: String,
    required: true,
  },

  articleidentifer: {
    String,
    required: true,
  },
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", scrapermongonewsite);

module.exports = Comment;
