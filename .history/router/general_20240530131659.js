const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented (POST /register)"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn= req.params.isbn;
  let filtered_book = books.filter((book) => book.isbn == isbn);
  const booksString = JSON.stringify(filtered_book, null, 4);
  res.send(booksString);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filtered_book = books.filter((book) => book.author == author);
  const booksString = JSON.stringify(filtered_book, null, 4) + "\n";
  res.send(booksString);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const author = req.params.author;
  let filtered_book = books.filter((book) => book.author == author);
  const booksString = JSON.stringify(filtered_book, null, 4) + "\n";
  res.send(booksString);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented (GET /review/:isbn)"});
});

module.exports.general = public_users;
