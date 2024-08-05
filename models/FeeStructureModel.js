import db from "../config/database.js"
import bcrypt from 'bcrypt';


export const insertFeeStructure = (data, result) => {
    console.log("hey is working:", data);
    const selectedComponents = data.selectedComponents;

    db.query("INSERT INTO fee_structure(course_id, description, amount, due_day, due_month) VALUES(?,?,?,?,?)", [data.courseId, data.description, data.amount, data.dueDay, data.dueMonth], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            db.query("SELECT * FROM fee_structure ORDER BY fee_structure_id DESC LIMIT 1", (lastErr, lastResults) => {
                if (lastErr) {
                    console.log(lastErr);
                    result(lastErr, null);
                } else {
                    if (lastResults.length > 0) {
                        const lastInsertedRow = lastResults[0];
                        console.log("Last Inserted data: ", lastInsertedRow);
                        console.log("Last inserted id:  ", lastInsertedRow.fee_structure_id);
                        const lastId = lastInsertedRow.fee_structure_id;

                        let insertionErrors = false;
                        selectedComponents.forEach((component, index) => {
                            db.query("INSERT INTO fee_mapping(fee_structure_id, fee_component_id) VALUES(?,?)", [lastId, component.fee_component_id], (mapErr, mapResults) => {
                                if (mapErr) {
                                    console.log(mapErr);
                                    insertionErrors = true;
                                }

                                if (index === selectedComponents.length - 1) {
                                    if (insertionErrors) {
                                        result(mapErr, null);
                                    } else {
                                        result(null, results);
                                    }
                                }
                            });
                        });
                    } else {
                        console.log("no rows found");
                        result(new Error("No rows found"), null);
                    }
                }
            });
        }
    });
}



export const deleteFeeStructureById = (id, result) => {
    console.log(id);
    db.query("delete from fee_mapping WHERE fee_structure_id = ?", [id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            db.query("Update fee_structure set state='inactive' WHERE fee_structure_id = ?", [id], (errB, resultsB) => {
                if (errB) {
                    result(errB, null);
                } else {
                    result(null, resultsB);
                }
            });
        }
    });
}


export const editFeeStructureById = (id, data, result) => {
    console.log("Editing fee structure:", data);
    const selectedComponents = data.selectedComponents;
    const feeStructureId = id;  // Use the provided id parameter

    // Check the data being passed
    console.log("feeStructureId:", feeStructureId);
    console.log("selectedComponents:", selectedComponents);

    // Update fee_structure
    db.query("UPDATE fee_structure SET course_id = ?, description = ?, amount = ?, due_day = ?, due_month = ? WHERE fee_structure_id = ?", [data.courseId, data.description, data.amount, data.dueDay, data.dueMonth, feeStructureId], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            // Update due_date in student_fee table
            db.query(`
                UPDATE student_fee sf
                JOIN student s ON sf.student_id = s.student_id
                JOIN fee_structure fs ON sf.fee_structure_id = fs.fee_structure_id
                SET sf.due_date = CONCAT(s.enrollment_year, '-', LPAD(fs.due_month, 2, '0'), '-', LPAD(fs.due_day, 2, '0'))
                WHERE sf.fee_structure_id = ?
            `, [feeStructureId], (updateErr, updateResults) => {
                if (updateErr) {
                    console.log(updateErr);
                    result(updateErr, null);
                } else {
                    // Delete existing fee_mapping entries for this fee_structure_id
                    db.query("DELETE FROM fee_mapping WHERE fee_structure_id = ?", [feeStructureId], (deleteErr, deleteResults) => {
                        if (deleteErr) {
                            console.log(deleteErr);
                            result(deleteErr, null);
                        } else {
                            // Insert new fee_mapping entries
                            let insertionErrors = false;
                            selectedComponents.forEach((component, index) => {
                                console.log("Inserting fee_mapping entry:", feeStructureId, component.fee_component_id);
                                db.query("INSERT INTO fee_mapping(fee_structure_id, fee_component_id) VALUES(?,?)", [feeStructureId, component.fee_component_id], (mapErr, mapResults) => {
                                    if (mapErr) {
                                        console.log(mapErr);
                                        insertionErrors = true;
                                    }

                                    if (index === selectedComponents.length - 1) {
                                        if (insertionErrors) {
                                            result(mapErr, null);
                                        } else {
                                            result(null, results);
                                        }
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    });
};



export const getFeeStructures = (offset, limit, page, term, result) => {
    if (term) {
        if (!isNaN(term)) {
            term = parseInt(term);
            console.log(term);
        } else {
            term = `%${term}%`;
        }


        db.query(
            "SELECT COUNT(*) AS count FROM fee_structure, course, course_name WHERE (fee_structure_id LIKE ? OR  course_name LIKE ? OR amount LIKE ? OR description LIKE ?) AND fee_structure.course_id = course.course_id AND course.course_name_id = course_name.course_name_id  and  fee_structure.state = 'active'",
            [term, term, term, term],
            (err, countResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const totalItems = countResults[0].count;


                    db.query(
                        "SELECT * FROM fee_structure, course, course_name WHERE (fee_structure_id LIKE ? OR  course_name LIKE ? OR amount LIKE ? OR description LIKE ?) AND fee_structure.course_id = course.course_id AND course.course_name_id = course_name.course_name_id and  fee_structure.state = 'active' LIMIT ?,?",
                        [term, term, term, term, offset, limit],
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

        db.query("SELECT COUNT(*) AS count FROM fee_structure, course, course_name WHERE fee_structure.course_id = course.course_id AND course.course_name_id = course_name.course_name_id and  fee_structure.state = 'active'", (err, countResults) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                const totalItems = countResults[0].count;


                db.query(
                    "SELECT * FROM fee_structure, course, course_name WHERE fee_structure.course_id = course.course_id AND course.course_name_id = course_name.course_name_id and  fee_structure.state = 'active'  LIMIT ?,?",
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


export const getCourses = (result) => {
    db.query("select * from course, course_name where course.course_name_id = course_name.course_name_id and course.state = 'active'", (err, results) => {
        
        if(err){
            result(err, null);
        }else{
            result(null, results);
        }

    }
    )
}

export const getFeeComponents = (result) => {
    db.query("select * from fee_component where state ='active'", (err, results) => {
        
        if(err){
            result(err, null);
        }else{
            result(null, results);
        }

    }
    )
}


export const getFeeMappingById = (id, result)=>{
    db.query("SELECT * FROM fee_mapping, fee_component where fee_structure_id = ? and fee_mapping.fee_component_id = fee_component.fee_component_id", [id], (err, results)=>{
        if(err){
            result(err, null);
        }else{
            result(null, results);
        }
    })
}

