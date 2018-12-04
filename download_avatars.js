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
          'Authorization': 'token ' + secrets.GITHUB_TOKEN
        }
      };

    request(options, function(err, response, body){
        // console.log(response);
        var contributors = JSON.parse(body);
        cb(err, contributors);
    });

}

getRepoContributors("jquery", "jquery", function(err, results) {
    // console.log(results);
    results.forEach((contributor) => {
        console.log("Result: ", contributor.avatar_url);
        //    console.log("Result:", result.avatar_url);
        downloadImageByURL(contributor.avatar_url, './avatars/' + contributor.login +'.jpg');
    })
   
});


function downloadImageByURL(url, filepath){
    request.get(url)
            .on('error', function(err){
                console.log(err);
            })
            // .on('response', function(response){
            //     console.log('Response Status Code: ', response.statusCode);
            //     console.log("Response status message: ", response.statusMessage);    
            // })
            .pipe(fs.createWriteStream(filepath));
}

