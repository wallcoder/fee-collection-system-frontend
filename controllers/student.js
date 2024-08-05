import { insertStudent, deleteStudentById, editStudentById, getStudents } from "../models/StudentsModel.js";

export const showStudents = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term;
    const offset = (page - 1) * limit;


    getStudents(offset, limit, page, term, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const createStudent = (req, res) => {
    const data = req.body;
    insertStudent(data, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results);
        }
    })
}


export const deleteStudent = (req, res) => {
    const id = req.params.id;
    deleteStudentById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results)
        }
    })

}


export const editStudent = (req, res) => {
    const data = req.body;
    console.log("data received: ", data)
    const id = req.params.id;
    console.log(data, "ID: ", id)
    editStudentById(id, data, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.errorMessage) {
            res.status(400).json(results);
        } else {
            res.status(200).json(results);
        }
    });
};


