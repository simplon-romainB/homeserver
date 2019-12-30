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


router.post('/', async(req,res,next) => {
    middle.checkToken(req,res,next);
    const foreign =  "SELECT articles_id FROM articles WHERE articles_body = $1"
    const foreignArgs = [req.body.article]
    const client = await pool.connect()
    const requete = await client.query(foreign,foreignArgs);
    const request = "INSERT INTO comments (comments_article,comments_body, comments_id, comments_author, comments_date) VALUES ($1,$2,DEFAULT,$3,$4)";
    const args = [requete.rows[0], req.body.comment,req.body.author, req.body.date];
    const client2 = await pool.connect()
    const requete2 = await client2.query(request,args);
    res.send(requete);
  })
  
  module.exports = router;