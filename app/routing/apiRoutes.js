
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

    // Receive user details (name, photo, scores)
    var user = req.body;

    // parseInt for scores no floats
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    
    // variable for index freind and replacing the minimumDifference scores
    var freindNum = 0;
    var minimumDifference = 30;

    // in this nested for-loop, start off with a zero difference 
    //and substract the user and friend scores, one freind at a time
    //  whatever the difference is, add to the total difference
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;

      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;

        console.log("This is the Freind:",i);
        console.log("This is the Freind's Score index in the array:",j);
        console.log("This is the User's Score:",user.scores[j]);
        console.log("This is the Freind's Score:",friends[i].scores[j]);
        console.log("=======Subtract============");
        console.log("This is the difference:",difference,"\n");
        console.log("This is the totalDifference:",totalDifference,"\n");
        console.log("This is the minimumDifference:",minimumDifference,"\n");

      }

      //Check if there is a new minimum difference set and change the best 
      //friend index and set the new minimum for next freind array
      if(totalDifference < minimumDifference) {
        freindNum = i;
        minimumDifference = totalDifference;
      }
    }

    //add user to friend array
    friends.push(user);

    // best freind matches
    res.json(friends[freindNum]);
  });
};
