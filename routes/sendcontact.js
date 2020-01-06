var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
var middle = require('../middleware.js');
var app = express();
var nodeMailer = require('nodemailer');


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
    to: req.body.email,
    subject: "contact message",
    html: req.body.message
  };
  
  
  mg.messages().send(data, function (error, body) {
    console.log(body);
    });
});
module.exports = router;