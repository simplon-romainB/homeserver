var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
var middle = require('../middleware.js');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});



router.get('/', async(req,response, next) =>{
    response.setHeader("Content-Type", "text/html");
    const request = "SELECT * FROM articles";
    const client2 =  await pool.connect()
    const requete =  await client2.query(request, (err,result) => {
      response.send(result.rows);
      response.end();
      client2.end();})
   
    
    
});


  
  


module.exports = router;