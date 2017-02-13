var mongoose = require('mongoose');

var ParentOrChildSchema = new mongoose.Schema({
  _id: Number,
  sha: String
});

//todo rename to commitSchema
var GitHistorySchema = new mongoose.Schema({
  _id: Number,
  sha: String,
  author: String,
  commitDate: Date,
  parents: [ParentOrChildSchema]
}, {
    strict: "false"
  });

module.exports = mongoose.model('gitHistory', GitHistorySchema);