import db from "../config/database"

//get all  course fee
const getCourseFees = (result)=>{
    db.query("SELECT * FROM course")
}

