var express = require('express');
var router = express.Router();
var git = require('nodegit');
var path = require('path');

// GET home page
router.get('/', function (req, res, next) {
  res.render('index', {
    title: "VR Visualisation of Git",
    gitText: "Enter git url"
  });
});

// git repo url handler
//TODO: sanitize input? Is it required when using clone? 
router.post('/', function (req, res) {
  console.log(req.body.gitUrl);
  res.render('index', {
    title: "VR Visualisation of Git",
    gitText: "Enter git url",
    success: "success, repo url recieved:",
    repo: req.body.gitUrl
  });

  const localPath: string = require("path").join(__dirname, "../localRepo");

  //Get the repository, either open existing or clone it.
  let repo: any = git.Repository.open(localPath).catch(function (e) {
    console.log("Error: " + e);
    console.log("Cloning repo instead");
    return git.Clone.clone(req.body.gitUrl, localPath).then(function (repo) {
      console.log("cloned the repo");
    })
  });
  //TODO remove:
  repo.then(function (repo) {
    repo.getHeadCommit().then(function (commit) {
      var eventEmitter = commit.history();
      eventEmitter.on('commit', function (commit) {
        console.log(commit.sha() + "\n");
      });

      eventEmitter.on('end', function (commits) {
        console.log("end event fired \n");
      });

      eventEmitter.on('error', function (error) {
        console.log("eventEmitter failed");
      });
      eventEmitter.start();
    });
  })
});

module.exports = router;