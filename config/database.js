
import mysql from 'mysql';

import dotenv from 'dotenv';
dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT

}
)

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected successfully...');
});


export default db;