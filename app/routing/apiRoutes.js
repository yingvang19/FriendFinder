
var friends = require("../data/friends");

// // ===============================================================================
// // ROUTING
// // ===============================================================================

module.exports = function(app) {
  // display all friends found in friends.js as JSON object
  app.get("/api/friends", function(req, res) {
      res.json(friends);
  });

  app.post("/api/friends", function(req, res) {

    // display name/photo/scores out on the terminal 
    console.log("Name:",req.body.name);
    console.log("Photo:",req.body.photo);
    console.log("Scores:",req.body.scores);

    var userInput = req.body;
    for(var i = 0; i < userInput.scores.length; i++) {
      userInput.scores[i] = parseInt(userInput.scores[i]);
    }

    
    // variable for index freind and replacing the minimumDiff scores
    var freindNum = 0;
    var minimumDiff = 30;
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;

      for(var j = 0; j < friends[i].scores.length; j++) {
        var diff = Math.abs(userInput.scores[j] - friends[i].scores[j]);
        totalDifference += diff;

        console.log("This is the Freind:",i);
        console.log("This is the Freind's Score index in the array:",j);
        console.log("This is the User's Score:",userInput.scores[j]);
        console.log("This is the Freind's Score:",friends[i].scores[j]);
        console.log("=======Subtract============");
        console.log("This is the diff:",diff,"\n");
        console.log("This is the totalDifference:",totalDifference,"\n");
        console.log("This is the minimumDiff:",minimumDiff,"\n");

      }

      //Check if there is a new minimum difference set and change the best 
      //friend index and set the new minimum for next freind array
      if(totalDifference < minimumDiff) {
          minimumDiff = totalDifference;
          freindNum = i;
      }
    }

    //add user to friend array
    friends.push(userInput);

    // best freind matches
    res.json(friends[freindNum]);
  });
};
