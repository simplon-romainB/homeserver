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
  try {
   const client2 = await pool.connect()
   const requete = await client2.query('INSERT INTO users (user_email, user_password, user_role, user_id) VALUES ("test@test.com", "password", "user", DEFAULT)')
  }
  catch(err) {
    console.error(err);
    res.send("Error " + err);
  }
  });
module.exports = router;