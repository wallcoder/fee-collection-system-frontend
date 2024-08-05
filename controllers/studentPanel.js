import { getStudentById, getStudentFeeById, getStudentFeePaidById, editLateFeeById } from "../models/StudentPanelModel.js";

export const getStudent = (req, res) => {
    const id = req.params.id;
    getStudentById(id, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results);
        }
    })
}

export const getStudentFee = (req, res) => {
    const id = req.params.id;
    getStudentFeeById(id, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results);
        }


    })
}
export const getStudentFeePaid = (req, res) => {
    const id = req.params.id;
    getStudentFeePaidById(id, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results);
        }


    })
}

export const editLateFee = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    editLateFeeById(id, data, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results);
        }

    })
}