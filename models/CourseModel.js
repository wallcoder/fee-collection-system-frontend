import db from "../config/database.js";

//get all courses
export const getCourses = (result) => {
  db.query("SELECT * FROM course, course_name WHERE course.course_name_id = course_name.course_name_id and state = 'active'", (err, results) => {
    if (err) {
      console.log(err);
      result(err, null)
    } else {
      result(null, results);
    }
  })
}

//get single course
export const getCourseById = (id, result) => {
  db.query("SELECT * FROM course, course_name WHERE course_id = ? and state='active'", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null)
    } else {
      result(null, results[0]);
    }
  })
}

//insert course
export const insertCourse = (data, result )=>{
  db.query("SELECT * FROM course where course_name_id = ? and state = 'active'",[data.courseNameId], (err, results)=>{
    if(err){
      console.log(err);
      result(err, null);
    }else{
        if(results.length > 0){
          result(null, {message: "Course already exists"})
        }else{
          db.query("INSERT INTO course(course_name_id, no_of_sem) values(?,?)", [data.courseNameId, data.noOfSem],  (err, insertResults)=>{
            if(err){
              console.log(err);
              result(err, null);
            }else{
              result(null, insertResults)
            }
          })
        }

    }
  })

}

// Update course
export const updateCourseById = (data, id, result) => {
  console.log(data);
  console.log(id);

  // Check if a course with the same course_name_id exists, excluding the current course_id
  db.query("SELECT * FROM course WHERE course_name_id = ? AND course_id != ? and state='active'", [data.courseNameId, id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      if (results.length > 0) {
        // Course with the same course_name_id already exists
        result(null, { errorMessage: "Course already exists" });
      } else {
        // Update the course since it does not conflict with an existing one
        db.query(
          "UPDATE course SET course_name_id = ?, no_of_sem = ? WHERE course_id = ?",
          [data.courseNameId, data.noOfSem, id],
          (err, updateResults) => {
            if (err) {
              console.log(err);
              result(err, null);
            } else {
              result(null, updateResults);
            }
          }
        );
      }
    }
  });
};




// Delete Course from Database
export const deleteCourseById = (id, result) => {
  db.query("update course set state ='inactive' WHERE course_id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
};

//Select Count of Course
export const getCoursesPaginated = (offset, limit, page, term, result) => {
  if (term) {
    if (!isNaN(term)) {
      term = parseInt(term); 
      console.log(term);
    } else {
      term = `%${term}%`; 
    }

    db.query(
      "SELECT COUNT(*) AS count FROM course, course_name WHERE (course.course_id LIKE ? OR course_name.course_name LIKE ?) AND course.course_name_id = course_name.course_name_id and course.state = 'active'",
      [term, term],
      (err, countResults) => {
        if (err) {
          console.log(err);
          result(err, null);
        } else {
          const totalItems = countResults[0].count;

          db.query(
            "SELECT * FROM course, course_name WHERE course.course_name_id = course_name.course_name_id AND (course.course_id LIKE ? OR course_name.course_name LIKE ?) and course.state = 'active' LIMIT ?,?",
            [term, term, offset, limit],
            (err, results) => {
              if (err) {
                console.log(err);
                result(err, null);
              } else {
                const totalPages = Math.ceil(totalItems / limit);
                const currentPage = page;

                result(null, { results, totalPages, currentPage });
              }
            }
          );
        }
      }
    );
  } else {
    db.query("SELECT COUNT(*) AS count FROM course where state = 'active'", (err, countResults) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        const totalItems = countResults[0].count;

        db.query(
          "SELECT * FROM course, course_name WHERE course.course_name_id = course_name.course_name_id and state = 'active' LIMIT ?,?",
          [offset, limit],
          (err, results) => {
            if (err) {
              console.log(err);
              result(err, null);
            } else {
              const totalPages = Math.ceil(totalItems / limit);
              const currentPage = page;

              result(null, { results, totalPages, currentPage });
            }
          }
        );
      }
    });
  }
};


//Select All Course Names
export const getCourseNames = (result) =>{
  db.query("SELECT * from course_name", (err, results)=>{
    if(err){
      console.log(err);
      result(err, null);
    }else{
      result(null, results)
    }
  })

}

export const insertCourseName = (data, result )=>{
  db.query("SELECT * FROM course_name where course_name = ?",[data.name], (err, results)=>{
    if(err){
      console.log(err);
      result(err, null);
    }else{
        if(results.length > 0){
          result(null, {message: "Course name already exists"})
        }else{
          db.query("INSERT INTO course_name(course_name) values(?)", [data.name], (err, insertResults)=>{
            if(err){
              console.log(err);
              result(err, null);
            }else{
              result(null, insertResults)
            }
          })
        }

    }
  })

}
// Insert Course Name
// export const insertCourseName = (data, result) => {
//   db.query("INSERT INTO course_name(name) VALUES(?)", [data.courseName], (err, results) => {
//     if (err) {
//       console.log(err);
//       result(err, null)
//     } else {
     
//       result(null, results);
//     }
//   })
// }


// 