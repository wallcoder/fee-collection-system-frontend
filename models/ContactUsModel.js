import db from "../config/database.js"


export const insertInquiry =(data, result)=>{
    db.query("insert into inquiry(name, phone, email, inquiry) values(?,?,?,?) ", [data.name, data.phone, data.email, data.inquiry], (err ,results)=>{
        if(err){
            result(err, null)
        }else{
            result(null, results)
        }
    })
}