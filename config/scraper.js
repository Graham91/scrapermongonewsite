var cheerio = require("cheerio");

var axios = require("axios");

const RESULTS = {
  getresults: function (cb) {
    var results = [];
    let stopper = 0;
    axios.get("https://www.foxnews.com/").then(function (response) {
      var $ = cheerio.load(response.data);
      //   console.log($);
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
              //   console.log(link);
              //   console.log(article);
              //   console.log(picture2);
              results.push({
                article: { name: article, url: link, image: picture2 },
              });
            } else {
              //   console.log(link);
              //   console.log(article);
              //   console.log(picture);
              stopper++;
              //   console.log(stopper);
              results.push({
                article: { name: article, url: link, image: picture },
              });
            }
          }
        }
      });
      // console.log(results);
      cb(results);

      // $("section.nba-player-index__trending-item").each(function(i, element) {

      //     var name = $(element).find("a").attr("title");

      //     var position = $(element).find("div.nba-player-index__details").children().first().text();
      //     var height = $(element).find("div.nba-player-index__details").find('span:nth-child(2)').text();
      //     var heightandweight = height.split("|");

      //     results.push({
      //         player: { name, position, height: heightandweight[0], weight: heightandweight[1] }
      //     });
      // });

      //   console.log(results);
    });
  },
};
module.exports = RESULTS;
