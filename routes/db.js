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

router.post('/', function(req,res) {
  bcrypt.hash("Magicstar198.", 10, function (err,hash) {
    pool.connect().query('INSERT INTO users (user_email, user_password) VALUES ('+req.body.email+', '+hash+')')
  });
});
module.exports = router;