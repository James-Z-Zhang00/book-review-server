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
        res.send("This is the login page for " + (username) + ", pw: " + (password));
    }

    if (isValid(username,password)) {
        res.send("This is the login page for " + (username) + ", pw: " + (password));
    }
    res.send((username) + " user authenication failed!");
});

module.exports.login = login_user;