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

let check;
router.post('/', async(req,response, next) =>{
    response.header("Access-Control-Allow-Origin", "*");
    try {

    const hash = "SELECT user_password FROM users WHERE user_email = $1"
    const role = "SELECT user_role FROM users WHERE user_email = $1"
    const active = "SELECT user_activation FROM users WHERE user_email = $1"
    const values = [req.body.email]
    const client2 =  await pool.connect()
    const requete =  await client2.query(hash,values)
    if (requete.rows[0] == null) {
        response.send("email doesn't exist")
    }
    else {
    const requete2 = await client2.query(role,values)
    const requete3 = await client2.query(active,values)

    //let requeteJson = JSON.stringify(requete)
    let hashFinal =requete.rows[0].user_password
    let comparison = bcrypt.compare(req.body.password, hashFinal, function(err, res){
        check = res
        if (check === true){
            let token = jwt.sign({username: req.body.email},
                config.secret,
                { expiresIn: '24h' // expires in 24 hours
                }
              );
              // return the JWT token for the future API calls
              let reponse = JSON.stringify([token,requete2.rows[0].user_role,requete3.rows[0].user_activation])
              response.send(reponse)
              
            
            
        }
        else {
            response.send(JSON.stringify("wrong password"));
        }
    })
    }
}
    catch(err) {
        console.log(err)
    }
    
});
module.exports = router;