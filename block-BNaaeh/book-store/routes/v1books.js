let express = require("express");
let router = express.Router();
let Book = require("../models/Book");


// Render all books
router.get("/", (req,res,next) => {
  Book.find({}, (err, books) => {
    if(err) res.status(404).json(err);
    res.status(200).json(books);
  });
});


// Create new book
router.post("/new", (req,res,next)=>{
  Book.create(req.body, (err, book)=>{
    if(err) res.status(404).json(err);
    res.status(200).json(book);
  });
});


// Render Specific book
router.get("/:id", (req,res,next)=>{
  Book.findById(req.params.id, (err, book)=>{
    if(err) res.status(404).json(err);
    res.status(200).json(book);
  });
});


// Update Specific book
router.put("/:id", (req,res,next)=>{
  Book.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, book)=>{
    if(err) res.status(404).json(err);
    console.log(book);
    res.status(200).json(book);
  });
});


// Delete Specific book
router.delete("/:id", (req,res,next)=>{
  Book.findByIdAndDelete(req.params.id, (err, book)=>{
    if(err) res.status(404).json(err);
    res.status(200).json(book);
  });
});
module.exports = router;