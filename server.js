const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const database = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '12345',
      database : 'smart-brain'
    }
  });
const rootZone = require('./controllers/root');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const app = express();


app.use(bodyParser.json())
app.use(cors())
app.get("/",(req,res)=>rootZone.handleRoot(req,res,database))

app.post('/signin',signin.handleSignin(bcrypt,database))

app.post("/register",(req,res)=>register.handleRegister(req,res,bcrypt,database))

app.get("/profile/:id",(req,res)=>profile.handleProfile(req,res,database))

app.put("/image",(req,res)=>image.handleImage(req,res,database))

app.post("/imageurls",(req,res)=>image.handleApiCall(req,res))

app.listen(3003,()=>console.log('app is running on port 3003'))