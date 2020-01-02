var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
var nodeMailer = require('nodemailer');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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
   const requete = await client2.query(text,values)
  }
  catch(err) {
    console.error(err);
    res.send("Error " + err);
  }

  rand=Math.floor((Math.random() * 100) + 54);
  link="https://peaceful-mountain-88307.herokuapp.com/db/verify?id="+rand;

  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // should be replaced with real sender's account
        user: 'yyshtar@gmail.com',
        pass: '3225199b'
    }
});
let info = await transporter.sendMail({
    from: 'yyshtar@gmail.com', // sender address
    to: req.body.email,
    subject: 'verify your adress email', // Subject line
    html: "<p>please verify your email adress by clicking on the link <a href = "+link+ ">here</a></p>"
    
  });
});

router.get('/verify', async(req,res,next) =>{
if (req.query.id == rand) {
  console.log("compte activé")
  res.render('index', { title: 'Hey', message: 'compte activé'});
}
});


module.exports = router;