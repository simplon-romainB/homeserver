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
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: 'yyshtar@gmail.com',
            pass: '3225199b'
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        subject: req.body.email,
        to: 'romain.barry69',
        body: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
})

module.exports = router;