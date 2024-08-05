import db from "../config/database.js"

export const getInquiries = (offset, limit, page, term, result) => {
    if (term) {
        if (!isNaN(term)) {
            term = parseInt(term);
            console.log(term);
        } else {
            term = `%${term}%`;
        }


        db.query(
            "SELECT COUNT(*) AS count FROM inquiry WHERE inquiry_id LIKE ? OR name LIKE ? OR phone LIKE ? OR EMAIL LIKE ?",
            [term, term, term, term],
            (err, countResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const totalItems = countResults[0].count;


                    db.query(
                        "SELECT * FROM inquiry  WHERE inquiry_id LIKE ? OR name LIKE ? OR phone LIKE ? OR EMAIL LIKE ? LIMIT ?,?",
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

        db.query("SELECT COUNT(*) AS count FROM inquiry", (err, countResults) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                const totalItems = countResults[0].count;


                db.query(
                    "SELECT * FROM inquiry LIMIT ?,?",
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

export const deleteInquiryById = (id, result) => {
    console.log(id);
    db.query("Delete from inquiry where inquiry_id = ?", [id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    })
}