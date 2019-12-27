var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const config = require('./config.js');
var middle = require('../middleware.js');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});



router.post('/', async(req,res,next) => {
  console.log("je vais sur la route");
  //middle.checkToken();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Authorization", req.header.token)
  const request = "INSERT INTO articles (articles_id,articles_name,articles_body,articles_date) VALUES (DEFAULT,$1,$2,$3)";
  const args = [req.body.titre, req.body.article, req.body.date];
  const client = await pool.connect()
  const requete = await client.query(request,args);
  res.send(requete);
})

module.exports = router;