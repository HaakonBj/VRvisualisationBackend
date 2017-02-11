var express = require('express');
var router = express.Router();
var repository = require('../helpers/repository')
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
  repository.initRepo(req.body.gitUrl);

});
module.exports = router;