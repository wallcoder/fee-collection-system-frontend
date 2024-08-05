import db from "../config/database.js";
export const storePayment = (data, result) => {
    console.log("Storing payment data:", data);
    const selectedFees = data.selectedFees;

    db.query(
        "INSERT INTO payment(ref_no, payment_type, status, payment_amount, stud_name, reg_no) VALUES(?,?,?,?,?,?)",
        [data.paymentId, data.type, data.status, data.total, data.studName, data.regNo],
        (err, results) => {
            if (err) {
                console.log("Error inserting payment:", err);
                return result(err, null);
            }

            const paymentId = results.insertId;
            let insertionErrors = false;
            let completedInserts = 0;
            const totalInserts = selectedFees.length;

            selectedFees.forEach((sf) => {
                db.query(
                    "INSERT INTO student_fee_payment(student_fee_id, payment_id) VALUES(?, ?)",
                    [sf.id, paymentId],
                    (sfErr) => {
                        if (sfErr) {
                            console.log("Error inserting student fee payment:", sfErr);
                            insertionErrors = true;
                        }

                        completedInserts++;

                        
                        if (completedInserts === totalInserts) {
                            if (data.status === 'success') {
                                
                                db.query(
                                    "UPDATE student_fee SET status = 'paid' WHERE student_fee_id IN (?)",
                                    [selectedFees.map(sf => sf.id)],
                                    (updateErr) => {
                                        if (updateErr) {
                                            console.log("Error updating student fee statuses:", updateErr);
                                            insertionErrors = true;
                                        }
                                        
                                        if (insertionErrors) {
                                            result(new Error("Some fee payments or updates could not be completed"), null);
                                        } else {
                                            result(null, { paymentId, results });
                                        }
                                    }
                                );
                            } else {
                               
                                result(null, { paymentId, results });
                            }
                        }
                    }
                );
            });
        }
    );
};
