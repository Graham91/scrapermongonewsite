var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");

var app = express();

// var axios = require("axios");
// var cheerio = require("cheerio");

// var db = require("./models");

var PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controler/routes.js");

app.use(routes);

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
