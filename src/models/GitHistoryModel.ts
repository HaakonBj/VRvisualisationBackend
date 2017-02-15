var mongoose = require('mongoose');

var ParentOrChildSchema = new mongoose.Schema({
  sha: String
});

//todo rename to commitSchema
var GitHistorySchema = new mongoose.Schema({
  _id: Number,
  sha: String,
  author: String,
  commitDate: Date,
  parents: [ParentOrChildSchema]
},
{
  strict: "false"
});

//Count schema for incremental key for the GitHistorySchema
var CounterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
});

var counter = mongoose.model('counter', CounterSchema);

//Pre hook for updating id before posting.
GitHistorySchema.pre('save', function(next){
  var doc = this;
  counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: {seq: 1}}, {new: true, upsert: true})
  .then(function(count){
    doc._id = count.seq;
    next();
  }) //maybe add id to parent schema too
  .catch(function(error){
    console.log("Counter error: " + error);
    throw error;
  });
});

module.exports = mongoose.model('gitHistory', GitHistorySchema);