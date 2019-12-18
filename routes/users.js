var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

/* GET users listing. */
router.get('/', async(req, res, next) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM users');
    const results = { 'results': (result) ? result.rows : null};
    res.send( results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

router.post('/register', function(req,res) {
  bcrypt.hash("Magicstar198.", 10, function (err,hash) {
   const client2 = pool.connect()
   const requete = client2.query('INSERT INTO users (user_email, user_password) VALUES ('+req.body.email+', '+hash+')')
  });
});

module.exports = router;
