var express = require('express');
var mongoose = require('mongoose');
var gitHistoryModel = require('../models/GitHistoryModel');
var router = express.Router();

// GET /GitHistory ,e.g. all commits
router.get('/', function(req,res,next){
	gitHistoryModel.find(function(err, commits){
		if(err) return next(err);
		res.json(commits);
	});
});

module.exports = router;