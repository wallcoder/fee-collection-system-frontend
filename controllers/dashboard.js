import { getTotalAdmins, getTotalAssAdmins, getTotalCourses, getTotalFeeAmount, getTotalHeadAdmins, getTotalStudents } from "../models/DashboardModel.js";

export const showTotalAdmins = (req, res)=>{
    getTotalAdmins((err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}
export const showTotalAssAdmins= (req, res)=>{
    getTotalAssAdmins((err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}
export const showTotalHeadAdmins = (req, res)=>{
    getTotalHeadAdmins((err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}
export const showTotalCourses = (req, res)=>{
    getTotalCourses((err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}
export const showTotalFeeAmount = (req, res)=>{
    getTotalFeeAmount((err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}
export const showTotalStudents = (req, res)=>{
    getTotalStudents((err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}