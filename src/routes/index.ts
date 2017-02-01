var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: "VR Visualisation of Git",
    gitText: "Enter git url"
 });
});

// git repo url handler
//TODO: sanitize input
router.post('/', function (req, res) {
  console.log(req.body.gitUrl);
  /*  res.render('index',{
      success: "success, repo url recieved:",
      repo: req.body.gitUrl
    });
  */
    //TODO retrieve data from git using this url
    
  });


module.exports = router;
