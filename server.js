var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
console.log('no error');

var url ="https://www.reddit.com/top/";

request(url, function(err, response, html){
  if(!err){
    var $ = cheerio.load(html);
    var allitems = $("#siteTable").children();
    var items = [];
    allitems.each(function(index){
       var results = $("#siteTable").children().eq(index).children().eq(4).find("a.title").text();
       if (results !== ""){
         items.push(results);
       }
    });

    fs.writeFile("output.csv", JSON.stringify(items, null, 4), function(err){
      if(err){
        console.log(err);
      }

      else {
        console.log("data extracted");
      }
    })
    //console.log(items);

  }
})
