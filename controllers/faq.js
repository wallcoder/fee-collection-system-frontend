import { insertFaq, deleteFaqById, editFaqById, getFaqs } from "../models/faqsModel.js";

export const showFaqs = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term;
    const offset = (page - 1) * limit;


    getFaqs(offset, limit, page, term, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const createFaq = (req, res) => {
    const data = req.body;
    insertFaq(data, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results);
        }
    })
}


export const deleteFaq = (req, res) => {
    const id = req.params.id;
    deleteFaqById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results)
        }
    })

}


export const editFaq = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    console.log(data, id)
    editFaqById(id, data, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.errorMessage) {
            res.status(400).json(results);
        } else {
            res.status(200).json(results);
        }
    });
};


