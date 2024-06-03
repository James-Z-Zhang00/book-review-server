const express = require('express');
let doesExist = require("./auth_users.js").doesExist;
let isValid = require("./auth_users.js").isValid;
const jwt = require('jsonwebtoken');
let users = require("./auth_users.js").users;
const login_user = express.Router();

login_user.post('/',function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.send("Please fill both username and password!");
    } else if (isValid(username,password)) {
        res.send("This is the login page for " + (username) + ", pw: " + (password));
    }
    res.send("Wrong username or password!");
});

module.exports.login = login_user;