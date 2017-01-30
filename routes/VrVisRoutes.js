var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var vrVisualisationBackend = require('../models/VrVisualisationBackend.js');

// GET /vrVis listing. 
router.get('/', function(req, res, next) {
  vrVisualisationBackend.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

// GET /vrVis/id 
router.get('/:id', function(req, res, next) {
  vrVisualisationBackend.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// POST /vrVis 
router.post('/', function(req, res, next) {
  vrVisualisationBackend.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// PUT /vrVis/:id 
router.put('/:id', function(req, res, next) {
  vrVisualisationBackend.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// DELETE /vrVis/:id 
router.delete('/:id', function(req, res, next) {
  vrVisualisationBackend.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;