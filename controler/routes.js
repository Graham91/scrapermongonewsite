var express = require("express");
var router = express.Router();
let handlebars = require("express-handlebars");

var results = require("../config/scraper.js");

router.get("/", function (req, res) {
  results.getresults(function (data) {
    let hbsObject = {
      articles: data,
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/api/findcomments", function (req, res) {});

router.get("/api/addcomment", function (req, res) {});

router.get("/api/addone", function (req, res) {});

module.exports = router;
