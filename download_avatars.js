var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
    // ...
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + secrets.GITHUB_TOKEN
        }
      };

    request(options, function(err, response, body){
        var contributors = JSON.parse(body);
        cb(err, contributors);
    });

}

getRepoContributors(repoOwner, repoName, function(err, results) {
    
    if(!repoOwner || !repoName){
        console.error("You didn't input all the arguments. Please check..");
    }else{
        results.forEach((contributor) => {
            console.log("Result: ", contributor.avatar_url);
            downloadImageByURL(contributor.avatar_url, './avatars/' + contributor.login +'.jpg');
        });
    }
    
});


function downloadImageByURL(url, filepath){
    request.get(url)
            .on('error', function(err){
                console.log(err);
            })
            .pipe(fs.createWriteStream(filepath));
}

