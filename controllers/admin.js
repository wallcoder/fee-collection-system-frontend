import { getAdmins, insertAdmin,deleteAdminById } from "../models/AdminsModel.js";


export const showAdmins = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term; 
    const offset = (page - 1) * limit;
    
   
    getAdmins(offset, limit, page, term, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const createAdmin = (req, res)=>{
    const data = req.body;
    insertAdmin(data, (err, results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }
    })
}

export const deleteAdmin = (req, res)=>{
    const id = req.params.id;
    deleteAdminById(id, (err, results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }
    })

}

