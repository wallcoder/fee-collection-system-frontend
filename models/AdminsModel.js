import db from "../config/database.js"
import bcrypt from 'bcrypt';



export const insertAdmin = async (data, result) => {
    try {
        
        db.query("SELECT * FROM admin WHERE email = ?", [data.email], async (err, results) => {
            if (err) {
                return result(err, null);
            }
            
            if (results.length > 0) {
                
                return result(null, { message: 'Email already used' });
            } else {
                
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(data.password, salt);

                console.log("salt: ", salt);
                console.log("hashedPassword: ", hashedPassword);
                console.log("data: ", data);

                db.query("INSERT INTO admin(fname, lname, email, phone, type, password, login_count) VALUES(?,?,?,?,?,?,?)",
                    [data.fName, data.lName, data.email, data.phone, data.type, hashedPassword, 0],
                    (err, insertResults) => {
                        if (err) {
                            return result(err, null);
                        } else {
                            return result(null, insertResults);
                        }
                    }
                );
            }
        });
    } catch (err) {
        console.error("Error hashing password:", err);
        result(err, null);
    }
};

export const deleteAdminById = (id, result) => {
    console.log(id);
    db.query("Delete from admin where admin_id = ?", [id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const getAdmins = (offset, limit, page, term, result) => {
    if (term) {
        if (!isNaN(term)) {
            term = parseInt(term);
            console.log(term);
        } else {
            term = `%${term}%`;
        }


        db.query(
            "SELECT COUNT(*) AS count FROM admin WHERE admin_id LIKE ? OR fname LIKE ? OR lname LIKE ? OR email LIKE ? OR type LIKE ? OR phone LIKE ?",
            [term, term, term, term, term, term],
            (err, countResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const totalItems = countResults[0].count;


                    db.query(
                        "SELECT * FROM admin WHERE admin_id LIKE ? OR fname LIKE ? OR lname LIKE ? OR email LIKE ? OR type LIKE ? OR phone LIKE ? LIMIT ?,?",
                        [term, term, term, term, term, term, offset, limit],
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

        db.query("SELECT COUNT(*) AS count FROM admin", (err, countResults) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                const totalItems = countResults[0].count;


                db.query(
                    "SELECT * FROM admin LIMIT ?,?",
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

