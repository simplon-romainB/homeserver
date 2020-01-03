var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
var middle = require('../middleware.js');
var app = express();
var nodeMailer = require('nodemailer');

