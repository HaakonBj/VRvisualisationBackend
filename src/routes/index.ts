var express = require('express');
var router = express.Router();
var git = require('nodegit');
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: "VR Visualisation of Git",
    gitText: "Enter git url"
 });
});

// git repo url handler
//TODO: sanitize input? Is it required when using clone? 
router.post('/', function (req, res) {
  console.log(req.body.gitUrl);
    res.render('index',{
      title: "VR Visualisation of Git",
      gitText: "Enter git url",
      success: "success, repo url recieved:",
      repo: req.body.gitUrl
    });

  var localPath = require("path").join(__dirname, "../localRepo");
   
   
  var repo = git.Clone.clone(req.body.gitUrl, localPath);

    //TODO clone data, output cloning
    //open, retrieve the data
    //console log out the data, to see what information is available.
  var errorAndAttemptOpen = function() {
    return git.Repository.open(localPath);
  };
  
  repo.catch(errorAndAttemptOpen)
  .then(function(repository) {
    // Access any repository methods here.
    console.log("Is the repository bare? %s", Boolean(repository.isBare()));
  });

});

module.exports = router;
