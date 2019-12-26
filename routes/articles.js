var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const config = require('./config.js');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.get('/', async(req,response, next) =>{
    response.header("Access-Control-Allow-Origin", "*");
    const request = "SELECT * FROM articles";
    const client2 =  await pool.connect()
    const requete =  await client2.query(request)
    console.log(response)
    response.send(response);
});

module.exports = router;