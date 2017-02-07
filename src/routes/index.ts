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

  const localPath: string = require("path").join(__dirname, "../localRepo");

  //Get the repository, either open existing or clone it.
  let repo: any  = git.Repository.open(localPath).catch(function(e){
    console.log("Error: " + e);
    console.log("Cloning repo instead");
    return git.Clone.clone(req.body.gitUrl, localPath).then(function(repo){
      console.log("cloned the repo");
    })    
  });
  //TODO remove:
  repo.then(function(repo){
    repo.getHeadCommit().then(function(commit){
      //console.log("This did work: \n" + commit);
      console.log(commit.author() + " " + commit.sha());
      commit.getParents().then(function(commits){
        commits.forEach(commit => {
          console.log(commit.sha());
        });
      });
    });
  })
});

module.exports = router;