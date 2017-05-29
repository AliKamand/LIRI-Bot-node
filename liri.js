var fs = require("fs");

var key = require("./key.js");

var Twitter = require('twitter');

var spotify = require('spotify');

var request = require("request");

var todo = process.argv[2];

var song = process.argv[3];

var movie = process.argv[3];




if (todo === "my-tweets") {

    var client = new Twitter(key.twitterKeys);



    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var tweet = tweets[i].text;
                console.log(tweet);

            }
        }
    });



} else if (todo === "spotify-this-song") {

    spotify.search({
        type: 'track',
        query: song
    }, function(err, data) {
        var artist = data.tracks.items[0].artists[0].name;
        var song = data.tracks.items[0].name;
        var url = data.tracks.items[0].external_urls.spotify;
        var album = data.tracks.items[0].album.name;
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        console.log(artist);
        console.log(song);
        console.log(url);
        console.log(album);


    });

} else if (todo === "movie-this") {

    request("http://www.omdbapi.com/?t=" + movie + "&apikey=40e9cece", function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB rating of the movie: " + JSON.parse(body).Ratings[0].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
            console.log("Website: " + JSON.parse(body).Website);
        }
    });



} else if (todo === "do-what-it-says") {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(",");
        
        if (error) {
            return console.log(error);
        }

     
        

        if (dataArr[0] === "my-tweets") {
            var client = new Twitter(key.twitterKeys);



            client.get('statuses/user_timeline', function(error, tweets, response) {
                if (!error) {
                    for (var i = 0; i < tweets.length; i++) {
                        var tweet = tweets[i].text;
                        console.log(tweet);

                    }
                }
            });

        } else if (dataArr[0] === "spotify-this-song") {

            spotify.search({
                type: 'track',
                query: dataArr[1]
            }, function(err, data) {
                var artist = data.tracks.items[0].artists[0].name;
                var song = data.tracks.items[0].name;
                var url = data.tracks.items[0].external_urls.spotify;
                var album = data.tracks.items[0].album.name;
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }

                console.log(artist);
                console.log(song);
                console.log(url);
                console.log(album);

            });

        } else if (dataArr[0] === "movie-this") {

            request("http://www.omdbapi.com/?t=" + dataArr[1] + "&apikey=40e9cece", function(error, response, body) {

                // If the request is successful
                if (!error && response.statusCode === 200) {

                    // Parse the body of the site and recover just the imdbRating
                    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                    console.log("Title of the movie: " + JSON.parse(body).Title);
                    console.log("Year the movie came out: " + JSON.parse(body).Year);
                    console.log("IMDB rating of the movie: " + JSON.parse(body).Ratings[0].Value);
                    console.log("Country where the movie was produced: " + JSON.parse(body).Country);
                    console.log("Language of the movie: " + JSON.parse(body).Language);
                    console.log("Plot of the movie: " + JSON.parse(body).Plot);
                    console.log("Actors in the movie: " + JSON.parse(body).Actors);
                    console.log("Website: " + JSON.parse(body).Website);
                }
            });

        } else {
                    console.log("check format of txt file!!!");
                };

    });
};