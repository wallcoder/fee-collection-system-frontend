import { getFeeComponents, getCourses, insertFeeComponent, deleteFeeComponentById, editFeeComponentById } from "../models/FeeComponentsModel.js";



// Function to handle fee components request
export const showFeeComponents = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term; // Check here that term is properly defined
    const offset = (page - 1) * limit;
    
   
    getFeeComponents(offset, limit, page, term, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// fetch course
export const showCourse = (req, res)=>{
    getCourses((err, results)=>{
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    
    })
        
}


// insert fee component
export const createFeeComponent = (req, res)=>{
    console.log(req.body);
    const data = req.body;
    insertFeeComponent(data, (err, results)=>{
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}

// delete 
export const deleteFeeComponent = (req, res)=>{

    const id = req.params.id;
    console.log(id)
    deleteFeeComponentById(id, (err, results)=>{
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
}

// EDIT
export const editFeeComponent  = (req, res)=>{
    
    const id = req.params.id;
    const data = req.body;
    console.log(id, data)
    editFeeComponentById(data, id, (err, results)=>{
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    })
    
}

