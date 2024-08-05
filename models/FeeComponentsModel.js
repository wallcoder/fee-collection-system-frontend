import db from "../config/database.js";




export const getFeeComponents = (offset, limit, page, term, result) => {
    if (term) {
        if (!isNaN(term)) {
            term = parseInt(term);
            console.log(term);
        } else {
            term = `%${term}%`;
        } console.log(term)


        db.query(
            "SELECT COUNT(*) AS count FROM fee_component WHERE (fee_component_id LIKE ? OR fee_component_name LIKE ? OR course LIKE ? OR amount LIKE ?) and state = 'active' ",
            [term, term, term, term],
            (err, countResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const totalItems = countResults[0].count;


                    db.query(
                        "SELECT * FROM fee_component WHERE (fee_component_id LIKE ? OR fee_component_name LIKE ? OR course LIKE ? OR amount LIKE ?)  and state = 'active'  LIMIT ?,?",
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
        // If no term provided, fetch all fee components
        db.query("SELECT COUNT(*) AS count FROM fee_component where state = 'active'", (err, countResults) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                const totalItems = countResults[0].count;

                // Query to get all fee components
                db.query(
                    "SELECT * FROM fee_component where state = 'active' LIMIT  ?,?",
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

// GET ALL COURSES
export const getCourses = (result) => {
    db.query("SELECT * FROM course, course_name where course.course_name_id = course_name.course_name_id and state = 'active'", (err, results) => {
        if (err) {
            result(err, null)
        } else {
            result(null, results)
        }
    })

}


//Insert Fee component
export const insertFeeComponent = (data, result) => {

    db.query("INSERT INTO fee_component(fee_component_name, amount, course) VALUES(?,?,?)", [data.feeComponentName, data.amount, data.course], (err, results) => {
        if (err) {
            result(err, null)
        } else {
            result(null, results)
        }

    })
}

// Delet fee component by id
export const deleteFeeComponentById = (id, result) => {
    console.log(id);
    db.query("UPDATE fee_component SET state = 'inactive' WHERE fee_component_id = ?", [id], (err, results) => {
        if (err) {
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const editFeeComponentById = (data, id, result) => {
    console.log("SSS", data, id);

    // Step 1: Update fee_component table
    db.query("UPDATE fee_component SET fee_component_name = ?, amount = ?, course = ? WHERE fee_component_id = ?", [data.feeComponentName, data.amount, data.course, id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            
            db.query(`
                SELECT DISTINCT fee_structure_id
                FROM fee_mapping
                WHERE fee_component_id = ?
            `, [id], (err, feeStructureResults) => {
                if (err) {
                    result(err, null);
                } else {
                    const feeStructureIds = feeStructureResults.map(row => row.fee_structure_id);
                    let updateErrors = [];

                    feeStructureIds.forEach((feeStructureId, index) => {
                       
                        db.query(`
                            SELECT SUM(fc.amount) AS total_amount
                            FROM fee_component fc
                            JOIN fee_mapping fm ON fc.fee_component_id = fm.fee_component_id
                            WHERE fm.fee_structure_id = ? and fc.state = 'active'
                        `, [feeStructureId], (sumErr, sumResults) => {
                            if (sumErr) {
                                updateErrors.push(sumErr);
                            } else {
                                const newTotalAmount = sumResults[0].total_amount;

                                // Step 4: Update amount column in fee_structure table
                                db.query("UPDATE fee_structure SET amount = ? WHERE fee_structure_id = ?", [newTotalAmount, feeStructureId], (updateErr, updateResults) => {
                                    if (updateErr) {
                                        updateErrors.push(updateErr);
                                    }

                                    // If all updates are done, return the result
                                    if (index === feeStructureIds.length - 1) {
                                        if (updateErrors.length > 0) {
                                            result(updateErrors, null);
                                        } else {
                                            result(null, updateResults);
                                        }
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
};

