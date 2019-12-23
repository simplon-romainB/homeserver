var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

router.post('/', async(req,res, next) =>{
    const hash = "SELECT user_password FROM users WHERE user_email = $1"
    const values = [req.body.email]
    const client2 =  await pool.connect()
    const requete =  await client2.query(hash,values)
    let comparison = bcrypt.compare(req.body.password, requete.Result.user_password, function(err,res){
        console.log(requete.Result.user_password)
        return res
    });
    if (comparison == true){
        console.log(req.body.email,requete.toString())
        res.send(req.body.email,requete.toString())
    }
    else {
        res.send("wrong password");
    }
    
});
module.exports = router;