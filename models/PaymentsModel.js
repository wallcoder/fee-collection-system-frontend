import db from "../config/database.js"



export const getPayments = (offset, limit, page, term, result) => {
    if (term) {
        if (!isNaN(term)) {
            term = parseInt(term);
            console.log(term);
        } else {
            term = `%${term}%`;
        }


        db.query(
            "SELECT COUNT(*) AS count FROM payment WHERE (payment_id LIKE ? OR payment_type LIKE ? OR status LIKE ? OR payment_amount LIKE ? OR payment_date LIKE ? OR ref_no LIKE ? or stud_name like ? or reg_no like ?) AND state = 'active' ",
            [term, term, term, term, term, term, term, term],
            (err, countResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const totalItems = countResults[0].count;


                    db.query(
                        "SELECT * FROM payment WHERE (payment_id LIKE ? OR payment_type LIKE ? OR status LIKE ? OR payment_amount LIKE ? OR payment_date LIKE ? OR ref_no LIKE ? or stud_name like ? or reg_no like ?) AND state = 'active' LIMIT ?,?",
                        [term, term, term, term, term, term,term , term,  offset, limit],
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

        db.query("SELECT COUNT(*) AS count FROM payment where state = 'active'", (err, countResults) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                const totalItems = countResults[0].count;


                db.query(
                    "SELECT * FROM payment where state = 'active' LIMIT ?,? ",
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

// soft delete
export const deletePaymentById = (id, result) => {
    console.log("Soft delete: ",id);
    db.query("update payment set state = 'inactive'  where payment_id = ?", [id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    })
}