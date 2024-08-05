
import db from "../config/database.js"

export const getStudentById  = (id, result)=>{
    db.query("SELECT * FROM student where reg_no = ?", [id], (err, results)=>{
        if(err){
            console.log("err:", err);
            result(err, null)
        }else{
            result(null, results)
        }
    })
}

export const getStudentFeeById = (id, result)=>{
    db.query("SELECT * FROM student_fee, student, course, course_name, fee_structure where student_fee.state = 'active' AND student_fee.student_id = student.student_id and student_fee.fee_structure_id = fee_structure.fee_structure_id and fee_structure.course_id = course.course_id and course.course_name_id = course_name.course_name_id  and student.reg_no = ?  and student_fee.status = 'unpaid'", [id], (err, results)=>{
        if(err){
            console.log("err:", err);
            result(err, null)
        }else{
            result(null, results)
        }
    })
}

export const getStudentFeePaidById = (id, result)=>{
    db.query("SELECT * FROM student_fee, student, course, course_name, fee_structure, student_fee_payment, payment where student_fee.student_fee_id = student_fee_payment.student_fee_id and student_fee_payment.payment_id = payment.payment_id and student_fee.state = 'active' AND student_fee.student_id = student.student_id and student_fee.fee_structure_id = fee_structure.fee_structure_id and fee_structure.course_id = course.course_id and course.course_name_id = course_name.course_name_id  and student.reg_no = ?  and student_fee.status = 'paid'  and payment.status='success'", [id], (err, results)=>{
        if(err){
            console.log("err:", err);
            result(err, null)
        }else{
            result(null, results)
        }
    })
}

export const editLateFeeById = (id, data, result)=>{
    db.query("update student_fee set late_fee = ? where student_fee_id = ?", [data.amount, id], (err, results)=>{
        if(err){
            console.log("err:", err);
            result(err, null)
        }else{
            result(null, results)
        }
    })
}