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



router.post('/', (req,res,next) => {
  middle.checkToken();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Authorization", req.header.token)
  const request = "INSERT INTO users (DEFAULT,$1,$2,$3)";
  const args = [req.body.titre, req.body.article, req.body.date];
  const client = pool.connect()
  const requete = client.query(request,args);
})

module.exports = router;