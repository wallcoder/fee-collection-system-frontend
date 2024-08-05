import { insertInquiry } from "../models/ContactUsModel.js";

export const createInquiry = (req, res)=>{
    const data = req.body;
    insertInquiry(data, (err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.status(200).json(results)
        }
    })
}