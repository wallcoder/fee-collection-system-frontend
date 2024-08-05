import db from "../config/database.js";


export const getTotalFeeAmount = (result)=>{
    db.query("SELECT SUM(payment_amount) as sum from payment where status = 'success' and state = 'active'", (err, results)=>{
        if(err){
            result(err, null)
        }else{
            result(null, results)
        }
    })
}

export const getTotalStudents = (result)=>{
    db.query("SELECT COUNT(*) as count from student where state = 'active'", (err, results)=>{
        if(err){
            result(err, null)
        }else{
            result(null, results)
        }
    })
}

export const getTotalAdmins = (result)=>{
    db.query("SELECT COUNT(*) as count from admin ", (err, results)=>{
        if(err){
            result(err, null)
        }else{
            result(null, results)
        }
    })
}

export const getTotalHeadAdmins = (result)=>{
    db.query("SELECT COUNT(*) as count from admin where  type='Head Admin'", (err, results)=>{
        if(err){
            result(err, null)
        }else{
            result(null, results)
        }
    })
}


export const getTotalAssAdmins = (result)=>{
    db.query("SELECT COUNT(*) as count from admin where  type='Assistant Admin'", (err, results)=>{
        if(err){
            result(err, null)
        }else{
            result(null, results)
        }
    })
}


export const getTotalCourses = (result)=>{
    db.query("SELECT COUNT(*) as count from course where state = 'active'", (err, results)=>{
        if(err){
            result(err, null)
        }else{
            result(null, results)
        }
    })
}
