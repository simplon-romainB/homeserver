var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
var middle = require('../middleware.js');
var app = express();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

router.put('/', async(req,res,next) => {
    middle.checkToken(req,res,next);
    const request = "INSERT articles SET 'articles_name' = $1, 'articles_body' = $2 WHERE 'articles_id' = $3";
    const args = [req.body.titre, req.body.article, req.body.id];
    const client = await pool.connect()
    const requete = await client.query(request,args, (err,result) => {
    res.send(result);
    res.end();
    requete.end()
    })
  });
  
  module.exports = router;