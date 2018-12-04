var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
    // ...
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization':secrets.GITHUB_TOKEN
        }
      };

    request(options, function(err, response, body){
        // console.log(response);
        var contributors = JSON.parse(body);
        cb(err, contributors);
    });

}

getRepoContributors("jquery", "jquery", function(err, results) {
    for(var key in results){
        console.log("Result: ", results[key].avatar_url);
    //    console.log("Result:", result.avatar_url);
    }
});
  