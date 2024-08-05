import { getStudentFees, insertStudentFee, deleteStudentFeeById, editStudentFeeById } from "../models/StudentFeesModel.js";

export const showStudentFees = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term;
    const offset = (page - 1) * limit;


    getStudentFees(offset, limit, page, term, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};


export const createStudentFee = (req, res)=>{
    const data = req.body;
    insertStudentFee(data, (err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results);
        }
    })
}

export const deleteStudentFee = (req, res)=>{
    const id = req.params.id
    deleteStudentFeeById(id, (err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}

export const editStudentFee = (req, res)=>{
    const data = req.body;
    const id  = req.params.id
    editStudentFeeById(id, data, (err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}