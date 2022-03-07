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