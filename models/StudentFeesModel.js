
import db from "../config/database.js"

import cron from 'node-cron';

export const insertStudentFee = (data, result) => {
    console.log("hey is working");
    db.query("INSERT INTO student_fee(student_id, fee_structure_id, due_date) VALUES(?,?,?)", [data.studentId, data.feeStructureId, data.dueDate], (err, results) => {
        if (err) {
            console.log(err);
            result(err, null)
        } else {
            
            result(null, results);
        }
    })

}


export const deleteStudentFeeById = (id, result) => {
    console.log("ID: ", id);
    db.query("update student_fee set state = 'inactive' where student_fee_id = ?", [id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getStudentFees = (offset, limit, page, term, result) => {
    if (term) {
        if (!isNaN(term)) {
            term = parseInt(term);
            console.log(term);
        } else {
            term = `%${term}%`;
        }


        db.query(
            "SELECT COUNT(*) AS count FROM student_fee, student, course, course_name, fee_structure WHERE (student_fee.student_fee_id LIKE ? OR student_fee.status LIKE ? OR student.name LIKE ? OR student.reg_no LIKE ? OR fee_structure.description LIKE ? OR fee_structure.amount LIKE ? OR course_name.course_name LIKE ?) AND student_fee.state = 'active' AND student_fee.student_id = student.student_id and student_fee.fee_structure_id = fee_structure.fee_structure_id and fee_structure.course_id = course.course_id and course.course_name_id = course_name.course_name_id",
            [term, term, term, term, term, term, term],
            (err, countResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const totalItems = countResults[0].count;


                    db.query(
                        "SELECT * FROM student_fee, student, course, course_name, fee_structure WHERE (student_fee.student_fee_id LIKE ? OR student_fee.status LIKE ? OR student.name LIKE ? OR student.reg_no LIKE ? OR fee_structure.description LIKE ? OR fee_structure.amount LIKE ? OR course_name.course_name LIKE ?) AND student_fee.state = 'active' AND student_fee.student_id = student.student_id and student_fee.fee_structure_id = fee_structure.fee_structure_id and fee_structure.course_id = course.course_id and course.course_name_id = course_name.course_name_id LIMIT ?,?",
                        [term, term, term, term, term, term, term, offset, limit],
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

        db.query("SELECT COUNT(*) AS count FROM student_fee, student, course, course_name, fee_structure where student_fee.state = 'active' AND student_fee.student_id = student.student_id and student_fee.fee_structure_id = fee_structure.fee_structure_id and fee_structure.course_id = course.course_id and course.course_name_id = course_name.course_name_id ", (err, countResults) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                const totalItems = countResults[0].count;


                db.query(
                    "SELECT * FROM student_fee, student, course, course_name, fee_structure where student_fee.state = 'active' AND student_fee.student_id = student.student_id and student_fee.fee_structure_id = fee_structure.fee_structure_id and fee_structure.course_id = course.course_id and course.course_name_id = course_name.course_name_id LIMIT ?,?",
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



export const editStudentFeeById = (id, data, result) => {
    console.log("ID:", id, "Data: ", data);
    db.query("Update student_fee set student_id = ?, fee_structure_id = ?, status = ?, due_date = ?", [data.studentId, data.feeStructureId, data.status, data.dueDate], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }

    })
}

export const updateLateFees = () => {
    const query = `
        UPDATE student_fee
        SET late_fee = GREATEST(0, DATEDIFF(CURDATE(), due_date)) * 10
        WHERE CURDATE() > due_date and status = 'unpaid' and state = 'active';
    `;

    db.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error updating late fees:', error.stack);
            return;
        }
        console.log('Late fees updated:', results.affectedRows);
    });
}


cron.schedule('0 0 * * *', updateLateFees);
updateLateFees();