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
      host: process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.get('/', (req, res) => { res.json(`It's working!!`)})
app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})
app.post('/imageUrl', (req, res) => {handleApiCall(req, res)})
app.put('/image', (req, res) => {handleImagePut(req, res, db)})

app.listen(PORT || 3000, () => {
    console.log(`Listing on port: ${PORT}`)
})

