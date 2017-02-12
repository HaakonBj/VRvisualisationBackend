var mongoose = require('mongoose');

var gitHistorySchema = new mongoose.Schema({
  _id: String,
  author: String,
  commitDate: Date,
  parentSha1: String,
  parentSha2: String,
  childSha1: String,
  childSha2: String,
}, {
    strict: "throw"
  });
module.exports = mongoose.model('gitHistory', gitHistorySchema);