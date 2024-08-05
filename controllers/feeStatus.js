import { getFeeStatus } from "../models/FeeStatusModel.js";

export const showFeeStatus = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term; // Check here that term is properly defined
    const offset = (page - 1) * limit;
    
   
    getFeeStatus(offset, limit, page, term, (err, results) => {

        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
        
    });
};
