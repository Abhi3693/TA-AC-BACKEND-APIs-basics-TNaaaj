let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let commentSchema = new Schema({
  text:{type:String, required: true},
  author:String,
  book:{type:Schema.Types.ObjectId, ref:"Book"}
});

let Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;