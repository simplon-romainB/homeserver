var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

let check;
router.post('/', async(req,res, next) =>{
    const hash = "SELECT user_password FROM users WHERE user_email = $1"
    const values = [req.body.email]
    const client2 =  await pool.connect()
    const requete =  await client2.query(hash,values)
    //let requeteJson = JSON.stringify(requete)
    let hashFinal =requete.rows[0].user_password
    let comparison = bcrypt.compare(req.body.password, hashFinal, function(err, res){
        check = res
    })
    if (check == true){
        console.log(req.body.email,hashFinal)
        res.send(req.body.email,hashFinal)
    }
    else {
        res.send("wrong password");
    }
    
});
module.exports = router;