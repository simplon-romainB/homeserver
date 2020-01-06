var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const mailgun = require("mailgun-js");
var http = require("http");
const DOMAIN = "sandbox2fb4006253504b5fa4e78cdcdf465765.mailgun.org";
const mg = mailgun({apiKey: "5cbc1918b0dfc706e4e67fee181bd806-6f4beb0a-87f53bfc", domain: DOMAIN});
var mailVerified;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

/* GET users listing. */


router.post('/', async(req,res, next) =>{
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  bcrypt.genSalt(10, function(err,salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash){

    })
  })
  const text = "INSERT INTO users (user_email, user_password, user_role, user_id) VALUES ($1,$2,$3, DEFAULT)";
  const values = [req.body.email, hash, "user"]
  try {
   const client2 = await pool.connect()
   const requete = await client2.query(text,values,(err,result) => client2.end())
  }
  catch(err) {
    console.error(err);
    res.send("Error " + err);
  }
  rand=Math.floor((Math.random() * 100) + 54);
  link="https://peaceful-mountain-88307.herokuapp.com/db/verify?id="+rand;
  const data = {
    from: "Mailgun Sandbox <postmaster@sandbox2fb4006253504b5fa4e78cdcdf465765.mailgun.org>",
    to: req.body.email,
    subject: "email verification",
    html: "<p>please click this<a href = "+ link+ ">link</a></p>"
  };
  
  
  mg.messages().send(data, function (error, body) {
    console.log(body);
    });
  mailVerified = req.body.email
  });
  

router.get('/verify', async(req,res,next) =>{
  if (req.query.id == rand) {
    console.log("compte activé")
    res.render('index', { title: 'Hey', message: 'compte activé'});
    
    try {
      
  const update = "UPDATE users SET user_activation = true WHERE user_email = $1"
  const optionQuery = [mailVerified]
  const client2 = await pool.connect()
  const requete = await client2.query(update,optionQuery, (err,result) => client2.end())
  

    }
     catch(err) {
       console.error(err);
       res.send("Error " + err);
     }
    }
  else {
    res.render('index', { title: 'Hey', message: 'compte non activé'})
  }
  res.end();
});




module.exports = router;