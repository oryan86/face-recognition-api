import express from 'express';
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import handleRegister from './Controllers/register.js';
import handleSignin from './Controllers/signin.js';
import handleProfileGet from './Controllers/profile.js';
import handleImagePut from './Controllers/image.js';
import handleApiCall from './Controllers/imageUrl.js';

// DATABASE
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'coder',
      password : '',
      database : 'smart-brian'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})
app.post('/imageUrl', (req, res) => {handleApiCall(req, res)})
app.put('/image', (req, res) => {handleImagePut(req, res, db)})

app.listen(PORT, () => {
    console.log(`Listing on port: ${PORT}`)
})
