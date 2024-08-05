
import db from "../config/database.js"

import { addMonths } from 'date-fns';
import { updateLateFees } from "./StudentFeesModel.js";




import { format } from 'date-fns';



export const insertStudent = (data, result) => {
    console.log("Inserting student data...: ", data);

    db.query(
        "SELECT COUNT(*) AS count FROM student WHERE reg_no = ?",
        [data.regNo],
        (checkErr, checkResults) => {
            if (checkErr) {
                console.log("Error checking registration number:", checkErr);
                result(checkErr, null);
                return;
            }

            if (checkResults[0].count > 0) {
                console.log("Registration number already exists.");
                result(null, { message: "Registration Number Already Exists" });
                return;
            }

            // Insert student without start_date
            db.query(
                "INSERT INTO student(reg_no, name, ph_no, roll_no, email, course_id, enrollment_year) VALUES(?,?,?,?,?,?,?)",
                [data.regNo, data.name, data.phone, data.rollNo, data.email, data.courseId, data.enrollmentYear],
                (err, insertResults) => {
                    if (err) {
                        console.log("Error inserting student:", err);
                        result(err, null);
                        return;
                    }

                    const studentId = insertResults.insertId;
                    console.log("Student inserted with ID:", studentId);

                    db.query(
                        "SELECT * FROM fee_structure WHERE course_id = ? and state = 'active'",
                        [data.courseId],
                        (feeErr, feeResults) => {
                            if (feeErr) {
                                console.log("Error retrieving fee structures:", feeErr);
                                result(feeErr, null);
                                return;
                            }

                            const insertFeePromises = feeResults.map((f) => {
                                let adjustedYear = data.enrollmentYear;

                                // Adjust year based on the description
                                if (f.description.includes("Semester-")) {
                                    const semesterNumber = parseInt(f.description.split('-')[1]);
                                    if (semesterNumber >= 2 && semesterNumber <= 3) {
                                        adjustedYear += 1;
                                    } else if (semesterNumber >= 4 && semesterNumber <= 5) {
                                        adjustedYear += 2;
                                    } else if (semesterNumber >= 6 && semesterNumber <= 7) {
                                        adjustedYear += 3;
                                    } else if (semesterNumber >= 8 && semesterNumber <= 9) {
                                        adjustedYear += 4;
                                    } else if (semesterNumber === 10) {
                                        adjustedYear += 5;
                                    }
                                }

                                const dueDate = new Date(Date.UTC(adjustedYear, f.due_month - 1, f.due_day));
                                const formattedDueDate = format(dueDate, 'yyyy-MM-dd');

                                return new Promise((resolve, reject) => {
                                    db.query(
                                        "INSERT INTO student_fee(student_id, fee_structure_id, due_date) VALUES(?,?,?)",
                                        [studentId, f.fee_structure_id, formattedDueDate],
                                        (sfErr, sfResults) => {
                                            if (sfErr) {
                                                reject(sfErr);
                                            } else {
                                                resolve(sfResults);
                                            }
                                        }
                                    );
                                });
                            });

                            Promise.all(insertFeePromises)
                                .then(sfResults => {
                                    console.log("All fee structures associated successfully.");
                                    updateLateFees();
                                    result(null, sfResults);
                                })
                                .catch(sfErr => {
                                    console.log("Error associating fee structures:", sfErr);
                                    result(sfErr, null);
                                });
                        }
                    );
                }
            );
        }
    );
};





export const deleteStudentById = (id, result) => {
    console.log(id);

    // First, update the state of rows in student_fee for the given student_id
    db.query("UPDATE student_fee SET state = 'inactive' WHERE student_id = ?", [id], (feeErr, feeResults) => {
        if (feeErr) {
            console.log("Error updating student_fee state:", feeErr);
            result(feeErr, null);
            return;
        }

        // Next, update the state of the student in the student table
        db.query("UPDATE student SET state = 'inactive' WHERE student_id = ?", [id], (studentErr, studentResults) => {
            if (studentErr) {
                console.log("Error updating student state:", studentErr);
                result(studentErr, null);
            } else {
                console.log("Student state updated to inactive for student_id:", id);
                result(null, studentResults);
            }
        });
    });
};


export const getStudents = (offset, limit, page, term, result) => {
    if (term) {
        if (!isNaN(term)) {
            term = parseInt(term);
            console.log(term);
        } else {
            term = `%${term}%`;
        }


        db.query(
            "SELECT COUNT(*) AS count FROM student, course, course_name where student.course_id = course.course_id and course.course_name_id = course_name.course_name_id and  (student_id LIKE ? OR reg_no LIKE ? OR name LIKE ? OR ph_no LIKE ? OR roll_no LIKE ? OR email LIKE ? OR enrollment_year LIKE ?) AND student.state = 'active'",
            [term, term, term, term, term, term, term],
            (err, countResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const totalItems = countResults[0].count;


                    db.query(
                        "SELECT * FROM student, course, course_name where student.course_id = course.course_id and course.course_name_id = course_name.course_name_id and (student_id LIKE ? OR reg_no LIKE ? OR name LIKE ? OR ph_no LIKE ? OR roll_no LIKE ? OR email LIKE ? OR enrollment_year LIKE ?) AND student.state = 'active' LIMIT ?,?",
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

        db.query("SELECT COUNT(*) AS count FROM student, course, course_name where student.course_id = course.course_id and course.course_name_id = course_name.course_name_id and  student.state = 'active'", (err, countResults) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                const totalItems = countResults[0].count;


                db.query(
                    "SELECT * FROM student, course, course_name where student.course_id = course.course_id and course.course_name_id = course_name.course_name_id and  student.state = 'active' LIMIT ?,?",
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



// export const editStudentById = (id, data, result) => {
//     console.log("ID:", id, "Data: ", data);
//     db.query("Update student set reg_no = ?, name = ?, ph_no = ?, roll_no= ?, email = ?, enrollment_year = ?  where student_id = ? ", [data.regNo, data.name, data.phone, data.rollNo, data.email, data.enrollmentYear, id], (err, results) => {
//         if (err) {
//             result(err, null);
//         } else {
//             result(null, results);
//         }

//     })
// }

export const editStudentById = (id, data, result) => {
    console.log("Editing student data...", data);

    // Step 1: Check if registration number is unique
    db.query("SELECT * FROM student WHERE reg_no = ? AND student_id != ?", [data.regNo, id], (checkErr, checkResults) => {
        if (checkErr) {
            console.log("Error checking registration number:", checkErr);
            result(checkErr, null);
            return;
        }

        if (checkResults.length > 0) {
            result(null, { message: 'Registration number already used' });
            return;
        }

        // Step 2: Retrieve the current course_id
        db.query("SELECT course_id FROM student WHERE student_id = ?", [id], (currentCourseErr, currentCourseResults) => {
            if (currentCourseErr) {
                console.log("Error retrieving current course_id:", currentCourseErr);
                result(currentCourseErr, null);
                return;
            }

            const currentCourseId = currentCourseResults[0].course_id;
            const shouldUpdateCourseId = data.courseId !== currentCourseId;

            console.log("Update course ID: ", shouldUpdateCourseId);

            // Step 3: Update student information
            const studentUpdateQuery = shouldUpdateCourseId ?
                "UPDATE student SET reg_no = ?, name = ?, ph_no = ?, roll_no = ?, email = ?, course_id = ?, enrollment_year = ?, start_date = ? WHERE student_id = ?" :
                "UPDATE student SET reg_no = ?, name = ?, ph_no = ?, roll_no = ?, email = ?, enrollment_year = ?, start_date = ? WHERE student_id = ?";

            const studentUpdateValues = shouldUpdateCourseId ?
                [data.regNo, data.name, data.phone, data.rollNo, data.email, data.courseId, data.enrollmentYear, data.startDate, id] :
                [data.regNo, data.name, data.phone, data.rollNo, data.email, data.enrollmentYear, data.startDate, id];

            db.query(studentUpdateQuery, studentUpdateValues, (studentErr, studentResults) => {
                if (studentErr) {
                    console.log("Error updating student:", studentErr);
                    result(studentErr, null);
                    return;
                }

                console.log("Student updated with ID:", id);

                if (shouldUpdateCourseId) {
                    // Step 4: Update student_fee state to 'inactive'
                    db.query("UPDATE student_fee SET state = 'inactive' WHERE student_id = ?", [id], (feeErr, feeResults) => {
                        if (feeErr) {
                            console.log("Error updating student_fee state:", feeErr);
                            result(feeErr, null);
                            return;
                        }

                        // Retrieve fee structures based on the new course_id
                        db.query("SELECT * FROM fee_structure WHERE course_id = ? AND state = 'active'", [data.courseId], (feeStructureErr, feeStructureResults) => {
                            if (feeStructureErr) {
                                console.log("Error retrieving fee structures:", feeStructureErr);
                                result(feeStructureErr, null);
                                return;
                            }

                            const insertFeePromises = feeStructureResults.map((f) => {
                                let adjustedYear = data.enrollmentYear;

                                if (f.description.includes("Semester-")) {
                                    const semesterNumber = parseInt(f.description.split('-')[1]);
                                    if (semesterNumber >= 2 && semesterNumber <= 3) {
                                        adjustedYear += 1;
                                    } else if (semesterNumber >= 4 && semesterNumber <= 5) {
                                        adjustedYear += 2;
                                    } else if (semesterNumber >= 6 && semesterNumber <= 7) {
                                        adjustedYear += 3;
                                    } else if (semesterNumber >= 8 && semesterNumber <= 9) {
                                        adjustedYear += 4;
                                    } else if (semesterNumber === 10) {
                                        adjustedYear += 5;
                                    }
                                }

                                const dueDate = new Date(Date.UTC(adjustedYear, f.due_month - 1, f.due_day));
                                const formattedDueDate = format(dueDate, 'yyyy-MM-dd');
                                console.log("d")
                                return new Promise((resolve, reject) => {
                                    db.query(
                                        "INSERT INTO student_fee(student_id, fee_structure_id, due_date, state) VALUES(?,?,?,'active')",
                                        [id, f.fee_structure_id, formattedDueDate],
                                        (sfErr, sfResults) => {
                                            if (sfErr) {
                                                reject(sfErr);
                                            } else {
                                                resolve(sfResults);
                                            }
                                        }
                                    );
                                });
                            });

                            Promise.all(insertFeePromises)
                                .then((results) => {
                                    console.log("e")
                                    result(null, { message: 'Student and fees updated successfully' });
                                })
                                .catch((error) => {
                                    console.log("Error inserting student_fee records:", error);
                                    result(error, null);
                                });
                        });
                    });
                } else {
                    // If course_id has not changed, return success without further actions
                    result(null, { message: 'Student updated successfully, no fee changes required' });
                }
            });
        });
    });
};






