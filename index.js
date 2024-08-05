import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import Router from './routes/routes.js';
import institutionRoutes from './routes/routes.js';
import fs from 'fs';
import session from 'express-session';

import dotenv from 'dotenv';
dotenv.config();




const PORT = 3000;
const app = express();

export const SECRET_KEY = process.env.SECRET_KEY;



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

// Use the institution routes
app.use('/api', institutionRoutes);

// Create the uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}