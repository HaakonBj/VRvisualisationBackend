var mongoose = require('mongoose');

var ParentOrChildSchema = new mongoose.Schema({
  sha: String
});

var CommitSchema = new mongoose.Schema({
  _id: Number,
  sha: String,
  author: String,
  commitDate: Date,
  parents: [ParentOrChildSchema]
},
{
  strict: "false"
});

module.exports = mongoose.model('gitHistory', CommitSchema);