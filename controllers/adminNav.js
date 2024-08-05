import { getAccountById, editAccountById, editPasswordById} from "../models/AdminNav.js";

export const getAccount = (req, res) => {
    const id = req.params.id;
    getAccountById(id, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results)
        }
    })
}

export const editAccount = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    editAccountById(id, data, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results)
        }
    })
}

export const editPassword = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    editPasswordById(id, data, (err, results) => {
        if (err) {
            res.send(err)
        } else {
            res.json(results)
        }
    })
}