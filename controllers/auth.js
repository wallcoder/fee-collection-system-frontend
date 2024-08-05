import { adminLogin, searchStudentById } from "../models/AuthModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const adminLoginAuth = (req, res) => {
    const data = req.body;
    adminLogin(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            
            res.json(results);
        }
    });

}

export const showProfile = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(401).send('Invalid token');
        }
        if (!decoded) {
            return res.status(401).send('Token could not be decoded');
        }
        
        
        
        res.send({ adminId: decoded.id, firstName: decoded.firstName, lastName: decoded.lastName, type: decoded.type });
    });
};

export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(401).send('Invalid token');
        }
        req.user = decoded; 
        
        next(); 
    });
};


export const searchStudent = (req, res)=>{
    const id = req.params.id;
    searchStudentById(id, (err, results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    })
}