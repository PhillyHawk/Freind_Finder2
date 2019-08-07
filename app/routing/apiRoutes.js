
var friends = require("../data/friend");

module.exports = function(app){
  app.get("/api/friend", function(req, res){
    res.json(friends);
  });

  app.post("/api/friend", function(req, res){
    // var totalDifference = 0
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };
    var userData = req.body;
    console.log(userData);
    // var userName = userData.name;
    var userScores = userData.scores;

    for (var i=0; i < friends.length; i++) {
      var friendCompatibility = 0;
      for (var j=0; j < friends[i].scores.length; j++) {
        if (userScores[j] != friends[i].scores[j]) {

          console.log(userScores[j]);
          console.log("friend score: " + friends[i].scores[j]);
          friendCompatibility+= Math.abs(userScores[j] - friends[i].scores[j]);
          console.log(friendCompatibility);
        }
      }
      if (friendCompatibility < bestMatch.friendDifference) {
        bestMatch.photo = friends[i].photo;
        bestMatch.name = friends[i].name;
        bestMatch.friendDifference = friendCompatibility;
      }
    }
    console.log(req.body);
    console.log(bestMatch);

    // var b = userScores.map(function(item){
    //   return parseInt(item, 10);

    // });

    // console.log("Name: " + userName);
    // console.log("User score " + userScores);

    // var sum = b.reduce((a, b) => a + b, 0);
    // console.log("Sum of users score " + sum);
    // console.log("Best match friends diff " + bestMatch.friendDifference);
    // console.log("===============================================================================");

    // for(var i =0; i < friends.length; i++){
    //   console.log(friends[i].name);
    //   totalDifference = 0;
    //   console.log("Total Diff " + totalDifference);
    //   console.log("Best match friend diff " + bestMatch.friendDifference);

    //   var bfriendScore = friends[i].scores.reduce((a,b) => a = b, 0);
    //   console.log("Total friend score " + bfriendScore);
    //   totalDifference =+ Math.abs(sum - bfriendScore);
    //   console.log("----------------------------> " + totalDifference);

    //   if(totalDifference <= bestMatch.friendDifference){
    //     bestMatch.name = friends[i].name;
    //     bestMatch.photo = friends[i].photo;
    //     bestMatch.friendDifference = totalDifference;
    //   }
    //   console.log(totalDifference + " Total Difference");
    // }
    //  console.log(bestMatch);
     friends.push(userData);
     console.log("New User added");
     res.json(bestMatch);
  });
};