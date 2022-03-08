let express = require("express");
let router = express.Router();
let Comment = require("../models/Comment");

// render all comment of Specific book
router.get("/:id", (req,res,next)=>{
  Comment.find({book:req.params.id}, (err, comment)=>{
    if(err) res.status(404).json(err);
    res.status(200).json(comment);
  });
});


// Add Comment on Specific book
router.post("/:id", async(req,res,next)=>{
  req.body.book = req.params.id;
  try {
    let comment = await Comment.create(req.body);
    let book = Book.findByIdAndUpdate(req.params.id, {$push: { comments: comment.id}}, {new:true});
    res.status(200).json({book});
  } catch (e) {
    res.status(404).json({e});
  }
});

// Update Specific comment
router.put("/:id", (req,res,next)=>{
  Comment.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, comment)=>{
    if(err) res.status(404).json(err);
    res.status(200).json(comment);
  });
});

// Delete Specific comment
router.delete("/:id", (req,res,next)=>{
  Comment.findByIdAndDelete(req.params.id, (err, comment)=>{
    if(err) res.status(404).json(err);
    res.status(200).json(comment);
  });
});

module.exports = router;