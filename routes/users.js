var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const middle = require('../middleware');

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
    res.end();
  }
})

router.post('/', (req,res,next) => {
  middle.checkToken()
  res.end();
})



module.exports = router;
