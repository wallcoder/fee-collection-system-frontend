import db from "../config/database.js";




export const getFeeStatus = (offset, limit, page, term, result) => {
    if (term) {
        if (!isNaN(term)) {
            term = parseInt(term); 
            console.log(term);
          } else {
            term = `%${term}%`; 
          }

        
        db.query(
            "SELECT COUNT(*) AS count FROM student_fee WHERE student_fee_id LIKE ? OR status LIKE ?",
            [term, term],
            (err, countResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const totalItems = countResults[0].count;

                 
                    db.query(
                        "SELECT * FROM student_fee WHERE student_fee_id LIKE ? OR status LIKE ? LIMIT ?,?",
                        [term, term,   offset, limit],
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
        db.query("SELECT COUNT(*) AS count FROM student_fee", (err, countResults) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                const totalItems = countResults[0].count;

                // Query to get all fee components
                db.query(
                    "SELECT * FROM student_fee LIMIT ?,?",
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
