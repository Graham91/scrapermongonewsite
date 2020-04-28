var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Articleschema = new Schema({
  name: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", Articleschema);

module.exports = Article;
