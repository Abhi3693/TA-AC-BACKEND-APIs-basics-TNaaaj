let express = require("express");
let router = express.Router();
let Book = require("../models/Book");
let Comment = require("../models/Comment");

// Render all books or by query like category, author, title
router.get("/", (req,res,next) => {
  Book.find(req.query, (err, books) => {
    if(err) res.status(404).json({err});
    res.status(200).json({books});
  });
});

// Create new book
router.post("/new", (req,res,next)=>{
  req.body.categories = req.body.categories.trim().split(" ");
  Book.create(req.body, (err, book)=>{
    if(err) res.status(404).json({err});
    res.status(200).json({book});
  });
});

// Render Specific book
router.get("/:id", (req,res,next)=>{
  Book.findById(req.params.id, (err, book)=>{
    if(err) res.status(404).json({err});
    res.status(200).json({book});
  });
});

// Update Specific book
router.put("/:id", (req,res,next)=>{
  Book.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, book)=>{
    if(err) res.status(404).json({err});
    res.status(200).json({book});
  });
});

// Delete Specific book
router.delete("/:id", (req,res,next)=>{
  Book.findByIdAndDelete(req.params.id, (err, book)=>{
    if(err) res.status(404).json({err});
    res.status(200).json({book});
  });
});

// render all categories
router.get("/categories/all", async(req,res,next)=> {
  try {
    let category = await Book.distinct("categories");
    res.status(200).json({category});
  } catch (err) {
    res.status(404).json({err});
  }
});

// render all categories
router.get("/tags/all", async(req,res,next)=> {
  try {
    let tags = await Book.distinct("tags");
    res.status(200).json({tags});
  } catch (err) {
    res.status(404).json({err});
  }
});

// render all categories count
router.get("/categories/count", (req,res,next)=> {
  Book.aggregate([ { $unwind : "$categories" }, {$group: {_id: "$categories", count: {$sum: 1 }}}], (err, books)=> {
    if(err) res.status(404).json({err});
    res.status(200).json({books});
  });
});

// render all tags count
router.get("/tags/count", (req,res,next)=> {
  Book.aggregate([ { $unwind : "$tags" }, {$group: {_id: "$tags", count: {$sum: 1 }}}], (err, books)=> {
    if(err) res.status(404).json({err});
    res.status(200).json({books});
  });
});

module.exports = router;