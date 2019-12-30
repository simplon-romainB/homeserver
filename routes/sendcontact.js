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
        host: "mail.gmx.com",
        port: 587,
        secure: false,
        auth: {
            // should be replaced with real sender's account
            user: 'yysh@gmx.fr',
            pass: 'magicstar198'
        }
    });
    let info = await transporter.sendMail({
        from: 'yysh@gmx.fr', // sender address
        to: "romain.barry69@gmail.com",
        subject: req.body.email, // Subject line
        text: req.body.message // plain text body
        
      });
});
module.exports = router;