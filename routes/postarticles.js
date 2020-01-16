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

//app.use(cors())



router.post('/', async(req,res,next) => {
  res.header('Content-Type','text/html');
  middle.checkToken(req,res,next);
  const request = "INSERT INTO articles (articles_id,articles_name,articles_body,articles_date,articles_categorie) VALUES (DEFAULT,$1,$2,$3,$4)";
  const args = [req.body.titre, req.body.article, req.body.date, req.body.categorie];
  const client = await pool.connect()
  const requete = await client.query(request,args, (err,result) => {
  res.send(result);
  res.end();
  requete.end()
  })
});

module.exports = router;