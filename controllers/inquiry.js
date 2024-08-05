import { getInquiries, deleteInquiryById } from "../models/InquiriesModel.js";

export const showInquiries = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term; 
    const offset = (page - 1) * limit;
    
   
    getInquiries(offset, limit, page, term, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};


export const deleteInquiry = (req, res)=>{
    const id = req.params.id;
    deleteInquiryById(id, (err, results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }
    })

}

