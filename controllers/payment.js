import { getPayments, deletePaymentById } from "../models/PaymentsModel.js";


export const showPayments = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term; 
    const offset = (page - 1) * limit;
    
   
    getPayments(offset, limit, page, term, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};


export const deletePayment = (req, res)=>{
    const id = req.params.id;
    deletePaymentById(id, (err, results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }
    })

}

