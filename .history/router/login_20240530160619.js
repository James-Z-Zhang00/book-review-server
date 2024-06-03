const express = require('express');
let doesExist = require("./auth_users.js").doesExist;
let isValid = require("./auth_users.js").isValid;
const jwt = require('jsonwebtoken');
let users = require("./auth_users.js").users;
const public_users = express.Router();