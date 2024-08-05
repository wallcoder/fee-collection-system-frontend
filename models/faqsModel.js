import db from "../config/database.js"
import bcrypt from 'bcrypt';


export const insertFaq = (data, result)=>{
    console.log("hey is working");
    db.query("INSERT INTO faq(question, answer) VALUES(?,?)", [data.question, data.answer], (err, results)=>{
        if(err){
            console.log(err);
            result(err, null)
        }else{
            result(null, results);
        }
    })

}


export const deleteFaqById = (id, result) => {
    console.log(id);
    db.query("Delete from faq where faq_id = ?", [id], (err, results) => {
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const editFaqById = (id, data, result)=>{
    console.log("ID:", id, "Data: ", data);
    db.query("Update faq set question = ?, answer = ? where faq_id = ? ", [data.question, data.answer, id], (err, results)=>{
        if (err) {
            result(err, null);
        } else {
            result(null, results);
        }
        
    })
}

export const getFaqs = (offset, limit, page, term, result) => {
    if (term) {
        if (!isNaN(term)) {
            term = parseInt(term);
            console.log(term);
        } else {
            term = `%${term}%`;
        }


        db.query(
            "SELECT COUNT(*) AS count FROM faq WHERE faq_id LIKE ? OR question LIKE ? ",
            [term, term],
            (err, countResults) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const totalItems = countResults[0].count;


                    db.query(
                        "SELECT * FROM faq WHERE faq_id LIKE ? OR question LIKE ? LIMIT ?,?",
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

        db.query("SELECT COUNT(*) AS count FROM faq", (err, countResults) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                const totalItems = countResults[0].count;


                db.query(
                    "SELECT * FROM faq LIMIT ?,?",
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