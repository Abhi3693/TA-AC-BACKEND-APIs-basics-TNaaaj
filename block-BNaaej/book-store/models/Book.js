let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let bookSchema = new Schema({
  title:{type:String, required: true},
  pages:Number,
  summary:String,
  author:String,
  categories:[String],
  tags: [String],
  comments:[{type:Schema.Types.ObjectId, ref:"Comment"}]
});

let Book = mongoose.model("Book", bookSchema);

module.exports = Book;