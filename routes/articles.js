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
  res.header("Connection", "close")
  next();
});

router.get('/', async(req,response, next) =>{
    response.header("Access-Control-Allow-Origin", "*");
    const request = "SELECT * FROM articles";
    const client2 =  await pool.connect()
    const requete =  await client2.query(request)
   
    response.send(requete.rows);
    response.end();
    res.socket.destroy();
});

router.post('/', (req,res,next) => {
  middle.checkToken();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Authorization", req.header.token)
  const request = "INSERT INTO users (DEFAULT,$1,$2,$3)";
  const args = [req.body.titre, req.body.article, req.body.date];
  const client = pool.connect()
  const requete = client.query(request,args);
  res.end();
  res.socket.destroy();
})

module.exports = router;