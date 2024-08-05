import { getInstitution, editInstitutionById } from "../models/InstitutionModel.js";

export const showInstitution = (req, res)=>{
    getInstitution((err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}

export const editInstitution = (req, res)=>{
    
    const data =req.body;
    editInstitutionById( data, (err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}