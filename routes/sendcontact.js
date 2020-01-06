var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
var middle = require('../middleware.js');
var app = express();
const mailgun = require("mailgun-js");
var nodeMailer = require('nodemailer');
const DOMAIN = "sandbox2fb4006253504b5fa4e78cdcdf465765.mailgun.org";
const mg = mailgun({apiKey: "5cbc1918b0dfc706e4e67fee181bd806-6f4beb0a-87f53bfc", domain: DOMAIN});


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
//app.use(cors())



router.post('/', async(req,res,next) => {
  const data = {
    from: "Mailgun Sandbox <postmaster@sandbox2fb4006253504b5fa4e78cdcdf465765.mailgun.org>",
    to: "romain.barry69@gmail.com",
    subject: req.body.email,
    html: req.body.message
  };
  
  
  mg.messages().send(data, function (error, body) {
    console.log(body);
    });
});
module.exports = router;