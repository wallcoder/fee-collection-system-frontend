import db from "../config/database.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
export const adminLogin = (data, result)=>{
    console.log(data);
    db.query("SELECT * FROM admin WHERE email = ? LIMIT 1", [data.email], async (err, results)=>{
        if(err){
            result(err, null)
        }else{
            if(results.length === 0){
                console.log("hehe")
                result(null, {message: "Invalid Email"})
            }
            else{
                const admin = results[0];
                const match  = await bcrypt.compare(data.password, admin.password);
                if(!match){
                    result(null, {message: "Invalid Password"})
                }else{

                    const token = jwt.sign({id: admin.admin_id, firstName: admin.fname, lastName: admin.lname , type: admin.type},  SECRET_KEY, {expiresIn: '12h'})
                    console.log(token);
                    result(null, {result, token});
                    // , {expiresIn: '1h'}
                }
            }
        }
    })
}

export const searchStudentById = (id, result)=>{
    console.log("yo it went through: ", id);
    db.query("SELECT * FROM student, student_fee where student.student_id = student_fee.student_id and student.reg_no = ? LIMIT 1",[id],(err, results)=>{
        if(err){
            result(err, null)
        }else{
            if(results.length > 0){
                
                result(null, results)
            }else{
                console.log("NOT FOUND")
                result(null, {message: "Registration Number Not Found"})
            }
        }
    });

}

