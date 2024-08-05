import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import Router from './routes/routes.js';
import institutionRoutes from './routes/routes.js';
import fs from 'fs';
import session from 'express-session';

import dotenv from 'dotenv';
import { Console } from 'console';
dotenv.config();



const SECRET_KEY = process.env.SECRET_KEY;


const PORT = 3000;
const app = express();

 

export const SERVER_PORT = process.env.SERVER_PORT;




app.use(session({
    secret: SECRET_KEY, 
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false } 
  }));
// to search
// CSRF - Cross site requestr forgery
// bearer token
app.use(cors({
    origin: 'http://localhost:5173', // Vue.js frontend port
    credentials: true
  }));
app.use(bodyParser.json());
app.use(Router);



function logger(req, res, next) {
    console.log(`[${Date.now()}] ${req.method} ${req.url}`);
    next();
}

app.use(logger);

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));


app.use('/api', institutionRoutes);


const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}