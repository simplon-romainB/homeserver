var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const config = require('./config.js');
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
//app.use(cors())



router.post('/', async(req,res,next) => {
  middle.checkToken(req,res,next);
  const request = "INSERT INTO articles (articles_id,articles_name,articles_body,articles_date) VALUES (DEFAULT,$1,$2,$3)";
  const args = [req.body.titre, req.body.article, req.body.date];
  const client = await pool.connect()
  const requete = await client.query(request,args);
  res.send(requete);
  res.end();
})

module.exports = router;