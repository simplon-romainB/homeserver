var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async(req,res, next) =>{
  bcrypt.genSalt(10, function(err,salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash){
      let pass = hash
    })
  })
  const text = "INSERT INTO users (user_email, user_password, user_role, user_id) VALUES ($1,$2,$3, DEFAULT)";
  const values = [req.body.email, pass, "user"]
  try {
   const client2 = await pool.connect()
   const requete = await client2.query(text,values)
  }
  catch(err) {
    console.error(err);
    res.send("Error " + err);
  }
  });
module.exports = router;