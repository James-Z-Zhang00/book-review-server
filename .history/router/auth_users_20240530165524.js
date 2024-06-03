const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const doesExist = (username)=>{
  const existedUser = users.find(user => user.username === username);
  return (existedUser) ? true : false
}

const isValid = (username, password)=>{ 
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ 
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
    if (authenticatedUser(username, password)) {
      
    }
    res.status(200).json({message: "User login OK"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.doesExist = doesExist;
module.exports.users = users;
