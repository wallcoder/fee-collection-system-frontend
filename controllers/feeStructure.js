import { insertFeeStructure, deleteFeeStructureById, editFeeStructureById, getFeeStructures, getCourses, getFeeMappingById, getFeeComponents } from "../models/FeeStructureModel.js";

export const createFeeStructure = (req, res) => {
    const data = req.body;
    console.log("COntroller: ", data)
    insertFeeStructure(data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}

export const deleteFeeStructure = (req, res) => {
    const id = req.params.id;
    deleteFeeStructureById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }

    })
}

export const editFeeStructure = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    editFeeStructureById(id, data, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}

export const showFeeStructures = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term;
    const offset = (page - 1) * limit;


    getFeeStructures(offset, limit, page, term, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};


export const showCoursesFs = (req, res) => {
    getCourses((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }

    })
}

export const showFeeComponentsFs = (req, res) => {
    getFeeComponents((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }

    })
}

export const getFeeMapping = (req, res) => {
    getFeeMappingById(req.params.id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })

}
