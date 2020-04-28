var express = require("express");

var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models/article");
// let db2 = require("./models/comment");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraperassignment", {
  useNewUrlParser: true,
});

app.get("/api/create", function (req, res) {
  let stopper = 0;
  axios.get("https://www.foxnews.com/").then(function (response) {
    var $ = cheerio.load(response.data);

    $("article").each(function (i, element) {
      if (stopper < 15) {
        var article = $(element).find("div.info").find("h2.title").text();
        let link = $(element).find("div.info").find("a").attr("href");
        picture = $(element)
          .find("div.m")
          .find("a")
          .find("picture")
          .find("img")
          .attr("src");

        if (picture === undefined) {
        } else {
          let last3char = picture.substr(picture.length - 3);

          if (last3char === "gif") {
            picture2 = $(element)
              .find("div.m")
              .find("a")
              .find("picture")
              .find("img")
              .attr("data-src");

            let result2 = { name: article, url: link, image: picture2 };

            db.create(result2)
              .then(function (dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
              })
              .catch(function (err) {
                // If an error occurred, log it
                console.log(err);
              });
          } else {
            stopper++;
            let result = { name: article, url: link, image: picture };
            // results.push({
            //   article: { name: article, url: link, image: picture },
            // });
            db.create(result)
              .then(function (dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
              })
              .catch(function (err) {
                // If an error occurred, log it
                console.log(err);
              });
          }
        }
      }
    });
  });
});

// router.get("/", function (req, res) {
//   results.getresults(function (data) {
//     let hbsObject = {
//       articles: data,
//     };
//     // console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });
app.get("/", function (req, res) {
  db.find({}, function (err, data) {
    let id = 0;
    let dataarray = [];
    data.forEach((element) => {
      let newobj = {};
      newobj.url = element.url;
      newobj.name = element.name;
      newobj.image = element.image;
      newobj.id = id;

      dataarray.push(newobj);
      id++;
    });
    let hbsObject = {
      articles: dataarray,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

app.get("/api/addcomment", function (req, res) {
  // req.body;
  // db.create(result)
  //   .then(function (dbArticle) {
  //     // View the added result in the console
  //     console.log(dbArticle);
  //   })
  //   .catch(function (err) {
  //     // If an error occurred, log it
  //     console.log(err);
  // });
});

app.get("/api/addone", function (req, res) {});

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
