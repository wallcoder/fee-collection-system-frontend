// import functions from CourseModel
import{
    getCourses,
    getCourseById,
    insertCourse,
    updateCourseById,
    deleteCourseById,
    getCoursesPaginated,
    getCourseNames,
    insertCourseName
    // insertCourseName
} from "../models/CourseModel.js";


//get all courses
const showCourses=(req, res)=>{
    getCourses((err, results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }
    })
}

//get single course
const showCourseById = (req,res)=>{
    getCourseById(req.params.id,(err, results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }

    })
};
// Create Course
export const createCourse = (req, res)=>{
    const data = req.body;
    insertCourse(data, (err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results);
        }
    })
}



const updateCourse = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    updateCourseById(data, id, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else if (results.errorMessage) {
        res.status(400).json(results);
      } else {
        res.status(200).json(results);
      }
    });
  };
  

const deleteCourse = (req, res)=>{
    const id = req.params.id;
    deleteCourseById(id, (err,results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results)
        }

    })
}

export const showCoursesPaginated = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const term = req.query.term; // Check here that term is properly defined
    const offset = (page - 1) * limit;
    
    getCoursesPaginated(offset, limit, page, term, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    });
  };
  

export const showCourseNames = (req, res)=>{
    getCourseNames((err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}

export const createCourseName = (req, res)=>{
    const data = req.body;
    insertCourseName(data, (err, results)=>{
        if(err){
            res.send(err)
        }else{
            res.json(results);
        }
    })
}



// const createCourseName = (req, res)=>{
//     const data = req.body;
//     insertCourseName(data,(err, results)=>{
//         if(err){
//             res.send(err);
//         }else{
//             res.json(results)
//         }
//     })
// }

export {showCourses,  showCourseById,  updateCourse, deleteCourse};
