const express = require('express');
const jwt = require('jsonwebtoken');
const { reset } = require('nodemon');
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

//review
regd_users.post("/auth/review", (req,res) => {
  res.send("Welcome to the secret review page!");
});

regd_users.put("/auth/review", (req,res) => {
  const isbn = req.params.isbn;
  const review = req.
  res.send("Welcome to the secret review page!");
});

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
    if (authenticatedUser(username, password)) {
    //   // Give access token to the user
    //   let accessToken = jwt.sign({
    //     username : username,
    //     password : password
    //   }, 'access', { expiresIn: 60 * 60 });

    //   req.session.authorization = {
    //     accessToken
    // }


    let accessToken = jwt.sign({
            data: username,
        }, 'access', { expiresIn: 60 * 60 });

        // Set the access token and username in the session
        req.session.authorization = {
            accessToken: accessToken,
        };
    return res.status(200).send("Customer successfully logged in\n");
    }
    res.status(401).send("No such username and password combination!");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.doesExist = doesExist;
module.exports.users = users;
