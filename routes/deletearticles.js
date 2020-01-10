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
middle.checkToken(req,res,next);
router.post('/', async(req,res,next) => {
    //middle.checkToken(req,res,next);
    const request = "DELETE FROM articles WHERE articles_id = $1" ;
    const args = [req.body.id];
    const client = await pool.connect()
    const requete = await client.query(request,args, (err,result) => {
    res.end();
    client.end()
    })
  });
  
  module.exports = router;